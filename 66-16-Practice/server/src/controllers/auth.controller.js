const userModel = require("../models/user.model")
const APiError = require("../utils/apiError")
const { hashedPassword, comparePassword } = require("../utils/hashedPassword")
const { generateAccessToken, generateRefreshToken } = require("../utils/token")



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

  let accessTK = await generateAccessToken(newUser._id)
  let refreshTK = await generateRefreshToken(newUser._id)

  let hashedRefresh = await hashedPassword(refreshTK)

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

const getMeController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    user: req.user
  })
}

const googleCallbackController = async (req, res) => {
  const user = req.user;

  const accessToken = await generateAccessToken(user._id)
  const refreshToken = await generateRefreshToken(user._id)

  await userModel.findByIdAndUpdate(user._id, {
    refreshTokenHash:await hashedPassword(refreshToken)
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