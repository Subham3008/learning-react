const cacheInstance = require("../config/caching")
const Profile = require("../models/profile.model")
const userModel = require("../models/user.model")
const sendMail = require("../services/mail.service")
const APiError = require("../utils/apiError")
const { hashedPassword, comparePassword } = require("../utils/hashedPassword")
const { generateAccessToken, generateRefreshToken } = require("../utils/token")


//----------register controller---------->>
const registerController = async (req, res) => {

  let { name, password, email } = req.body

  name = name?.trim();
  password = password?.trim();
  email = email?.trim().toLowerCase();

  if (!name || !password || !email) {
    throw new APiError(400, "All fields are reqired.")
  }

  let isExisted = await userModel.findOne({ email })

  if (isExisted) {
    throw new APiError(409, "Email already exists.")
  }

  let hashed = await hashedPassword(password)

  if (!hashed) {
    throw new APiError(404, "Password not hashed.")
  }

  let newUser = await userModel.create({
    name,
    passwordHash: hashed,
    email,
    isEmailVerified: true,
  })

  //link profile with User
  await Profile.create({
    user: newUser._id
  })

  let accessTK = await generateAccessToken(newUser._id)
  let refreshTK = await generateRefreshToken(newUser._id)

  // let hashedRefresh = await hashedPassword(refreshTK)

  // newUser.refreshTokenHash = hashedRefresh
  // await newUser.save()

  //--------redis usage to store refresh token------>>
  await cacheInstance.set(
    `refreshToken:${newUser._id}`, //key
    refreshTK,                      //value
    "EX",                           //Expire option
    24 * 60 * 60                    // Expiry time
  )

  //send mail to the registered user
  sendMail({
    to: newUser.email,
    subject: "Welcome to our app",
    html: `
    <h1>Welcome ${newUser.name}</h1>
    <p>Your account has been created successfully.</p>
  `
  }).catch((err) => {
    console.log("Mail Error:", err.message)
  })

  res.cookie("accessToken", accessTK, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshTK, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.status(201).json({
    message: "User created successfully."
  })
}

//---------------Login controller------------>>
const loginController = async (req, res) => {

  let { password, email } = req.body

  email = email?.trim().toLowerCase();
  password = password?.trim();

  if (!password || !email) {
    throw new APiError(400, "All fields are reqired.")
  }

  let isExisted = await userModel.findOne({ email }).select("+passwordHash")

  if (!isExisted) {
    throw new APiError(401, "Invalid email or password.")
  }


  let isCompared = await comparePassword(password, isExisted.passwordHash)

  if (!isCompared) {
    throw new APiError(401, "Invalid email or password.")
  }

  let accessTK = await generateAccessToken(isExisted._id)
  let refreshTK = await generateRefreshToken(isExisted._id)


  // let hashedRefresh = await hashedPassword(refreshTK)

  // isExisted.refreshTokenHash = hashedRefresh
  // await isExisted.save()

  //---------save refresh token inside redis storage-------->>
  await cacheInstance.set(
    `refreshToken:${isExisted._id}`,
    refreshTK,
    "EX",
    24 * 60 * 60
  );

  res.cookie("accessToken", accessTK, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshTK, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  })


  isExisted.passwordHash = undefined;

  return res.status(200).json({
    message: "User loggedIn successfully.",
    user: isExisted
  })
}

//---------fetched user controller------------>>
const getMeController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    user: req.user
  })
}

//--------google auth controller--------------->>
const googleCallbackController = async (req, res) => {
  const user = req.user;

  // send mail only for new users
  if (user.isNewUser) {

    await Profile.create({
      user: user.id
    })

    sendMail({
      to: user.email,
      subject: "Welcome to our app",
      html: `
        <h1>Welcome ${user.name}</h1>
        <p>Your account created successfully.</p>
      `
    }).catch((err) => {
      console.log("Mail Error:", err.message)
    })

  }


  const accessToken = await generateAccessToken(user._id)
  const refreshToken = await generateRefreshToken(user._id)

  await userModel.findByIdAndUpdate(user._id, {
    refreshTokenHash: await hashedPassword(refreshToken)
  })


  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.status(201).json({
    message: "User created successfully."
  })

}

//-----generate refresh token controller---------->>
const refreshTokenController = async (req, res) => {

  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new APiError(401, "Refresh token missing");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const savedToken = await cacheInstance.get(
    `refreshToken:${decoded.userId}`
  );

  if (!savedToken || savedToken !== refreshToken) {
    throw new APiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(decoded.userId);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Access token refreshed",
  });
};

//-------logout controller------------>>
const logoutController = async (req, res) => {

  const accessToken = req.cookies.accessToken

  // Remove refresh token
  await cacheInstance.del(
    `refreshToken:${req.user._id}`
  )

  if (accessToken) {
    await cacheInstance.set(
      `blacklist:${accessToken}`,
      "true",
      "EX",
      30 * 60
    )
  }

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully"
    })
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  googleCallbackController,
  refreshTokenController,
  logoutController,
}