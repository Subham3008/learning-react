const userModel = require("../models/user.model");
const ApiError = require("../utils/apiHandler");
const ApiResponse = require("../utils/apiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens");

const registerController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new ApiError(404, "All fields are required.")
  }
   

  let isExisted = await userModel.findOne({ email })

  if (isExisted) {
    throw new ApiError(409, "This email alredy exist.")
  }

  let hashed = await hashPassword(password)

  let newUser = await userModel.create({
    name,
    email,
    password: hashed,
  })

  let accessToken = generateAccessToken(newUser._id)
  let refreshToken = generateRefreshToken(newUser._id)

  newUser.refreshToken = refreshToken
  await newUser.save()

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.status(201).json(
    new ApiResponse(201, "User rigistered successfully", newUser)
  )
})

const loginController = async (req, res) => {
  try {

    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExisted = await userModel.findOne({ email })

    if (!isExisted) {
      return res.status(404).json({
        message: "User not found."
      })
    }

    let comparePass = await comparePassword(password, isExisted.password)

    if (!comparePass) {
      return res.status(401).json({
        message: "Unauthoized access"
      })
    }

    let accessToken = generateAccessToken(isExisted._id)
    let refreshToken = generateRefreshToken(isExisted._id)

    isExisted.refreshToken = refreshToken
    await isExisted.save()

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: "User loggedIn successfully.",
      user: isExisted
    })

  } catch (err) {
    console.log("Error from backend api", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}

module.exports = {
  registerController,
  loginController
}