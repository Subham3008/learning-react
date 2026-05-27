const userModel = require("../models/user.model")
const sendmail = require("../services/mail.service")
const APiError = require("../utils/apiError")
const { hashedValue, comparePassword, cryptoHashFunction } = require("../utils/hashed")
const { generateAccessToken, generateRefreshToken, generatePasswordResetToken, getResetTokenExpiry } = require("../utils/token")

const registerController = async (req, res) => {

  let { name, password, email } = req.body

  if (!name || !password || !email) {
    throw new APiError(400, "All fields are reqired.")
  }

  let isExisted = await userModel.findOne({ email })

  if (isExisted) {
    throw new APiError(409, "Email already exists.")
  }

  let hashed = await hashedValue(password)

  if (!hashed) {
    throw new APiError(404, "Password not hashed.")
  }

  let newUser = await userModel.create({
    name,
    passwordHash: hashed,
    email,
    isEmailVerified: true,
  })

  let accessTK = await generateAccessToken(newUser._id)
  let refreshTK = await generateRefreshToken(newUser._id)

  let hashedRefresh = await hashedValue(refreshTK)

  newUser.refreshTokenHash = hashedRefresh
  await newUser.save()

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


  let hashedRefresh = await hashedValue(refreshTK)

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

//registerPage
const registerPage = (req, res) => {
  res.render("registerPage")
}

const forgotPasswordPage = (req, res) => {
  //forgot-password--> jis route me bhjna hai uska path
  return res.render("forgot-password");
};

const forgotPasswordController = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    throw new APiError(400, "Email is required");
  }
  let user = await userModel.findOne({ email });
  //for security reasons
  if (!user) {
    throw new APiError(
      200,
      "If this email is registered, a password reset link has been sent.",
    );
  }
  //if email regitered hai then generate Raw token and usko hash bhi kro
  let passwordResetToken = generatePasswordResetToken();
  let hashRawToken = cryptoHashFunction(passwordResetToken);
  let passwordResetTokenExpiry = getResetTokenExpiry();
  //db me save karo
  user.passwordResetToken = hashRawToken;
  user.passwordResetExpires = passwordResetTokenExpiry;
  await user.save();

  //resetURL
  let resetUrl = `${process.env.APP_BASE_URL}/api/auth/resetPasswordPage/${passwordResetToken}`;

  // 6. Mail send karo
  await sendmail({
    to: user.email,
    subject: "Reset your password",
    text: `Click this link to reset your password: ${resetUrl}`,
    html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password.</p>
        <p>This link is valid for 10 minutes.</p>
        <a href="${resetUrl}">Reset Password</a>
      `,
  });

  return res.status(200).json({
    message: "Mail sent successfully",
    success: true,
  });
};

const resetPasswordPage = (req, res) => {
  let { token } = req.params;
  res.render("resetPassword", {
    token: token,
  });
}

const resetPassword = async (req, res) => {
  const { token } = req.params

  const { password, confirmPassword } = req.body

  if (!token) {
    throw new APiError(401, "Reset token is required")
  }

  if (!password || !confirmPassword) {
    throw new APiError(400, "Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    throw new APiError(400, "Password and confirm password do not match");
  }

  if (password.length < 6) {
    throw new APiError(400, "Password must be at least 6 characters long");
  }

  const hashedToken = cryptoHashFunction(token)


  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    //Find a user whose passwordResetExpires value is greater than the current time.
    //$gt--> gtreater than
    //Date.now()--->means current time in milliseconds.
    passwordResetExpires: { $gt: Date.now() },
  })



  if (!user) {
    throw new APiError(401, "Invalid or expired reset token");
  }

  const passwordHash = await hashedValue(password);

  user.passwordHash = passwordHash;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: `${user.name} password reset successfully`,
  });
}





module.exports = {
  registerController,
  loginController,
  registerPage,
  forgotPasswordPage,
  forgotPasswordController,
  resetPasswordPage,
  resetPassword,
}