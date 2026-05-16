const userModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens");

const registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExisted = await userModel.findOne({ email })

    if (isExisted) {
      return res.status(409).json({
        message: "This email alredy exist.",
      })
    }

    let hashed = await hashPassword(password)

    let newUser = await userModel.create({
      name,
      email,
      password: hashed,
      mobile,
    })

    let accessToken = generateAccessToken(newUser._id)
    let refreshToken = generateRefreshToken(newUser._id)

    newUser.refreshToken = refreshToken
    await newUser.save()

    res.cokkie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })

    res.cokkie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      message: "User create successfully.",
      user: newUser
    })

  } catch (err) {
    console.log("Error from backend api", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}

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

    res.cokkie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })

    res.cokkie("refreshToken", refreshToken, {
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
  registerController
}