const Profile = require("../models/profile.model")
const userModel = require("../models/user.model")
const sendMail = require("../services/mail.service")
const APiError = require("../utils/apiError")
const { hashedPassword, comparePassword } = require("../utils/hashedPassword")
const { generateAccessToken, generateRefreshToken } = require("../utils/token")


//----------register controller---------->>
const registerController = async (req, res) => {

  let { name, password, email } = req.body

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

  let hashedRefresh = await hashedPassword(refreshTK)

  newUser.refreshTokenHash = hashedRefresh
  await newUser.save()

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
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshTK, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.status(201).json({
    message: "User created successfully."
  })

}

//---------------Login controller------------>>
const loginController = async (req, res) => {

  let { password, email } = req.body

  if (!password || !email) {
    throw new APiError(400, "All fields are reqired.")
  }

  let isExisted = await userModel.findOne({ email }).select("+passwordHash")

  if (!isExisted) {
    throw new APiError(404, "User not found.")
  }


  let isCompared = await comparePassword(password, isExisted.passwordHash)

  if (!isCompared) {
    throw new APiError(401, "Password not matched, unauthorized access.")
  }

  let accessTK = await generateAccessToken(isExisted._id)
  let refreshTK = await generateRefreshToken(isExisted._id)


  let hashedRefresh = await hashedPassword(refreshTK)

  isExisted.refreshTokenHash = hashedRefresh
  await isExisted.save()

  res.cookie("accessToken", accessTK, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshTK, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  // delete user.passwordHash
  // delete user.refreshTokenHash

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

module.exports = {
  registerController,
  loginController,
  getMeController,
  googleCallbackController,
}