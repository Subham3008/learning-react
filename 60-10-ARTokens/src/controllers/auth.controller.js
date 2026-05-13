const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens");

const registeredController = async (req, res) => {
  try {

    let { name, email, password, mobile } = req.body

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExisted = await userModel.findOne({ email })

    //send conflict msg to client
    if (isExisted) {
      return res.status(409).json({
        message: "This email alredy exist.",
      })
    }

    let newUser = await userModel.create({
      name,
      email,
      password,
      mobile,
    })

    //generate access token
    let accesToken = generateAccessToken(newUser._id)

    //generate refresh token
    let refreshToken = generateRefreshToken(newUser._id)

    //refresh token save inside DB
    newUser.refreshToken = refreshToken
    await newUser.save()

    res.cookie("accessToken", accesToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({
      message: "User create successfully.",
      user: newUser
    })

  } catch (err) {
    console.log("Error from backend api", api);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

const loggedInController = async (req, res) => {
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
        message: "User not found.",
      })
    }

    //password compare
    let comparePass = isExisted.comparePassword(password)
    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    //generate access token
    let accesToken = generateAccessToken(isExisted._id)

    //generate refresh token
    let refreshToken = generateRefreshToken(isExisted._id)

    //refresh token save inside DB
    isExisted.refreshToken = refreshToken
    await isExisted.save()

    //save refresh and access token inside cookie
    res.cookie("accessToken", accesToken, {
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

const getRefreshTokenController = async (req, res) => {
  try {

    //get refresh token from cookies
    let refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthoried user"
      })
    }

    //decode refreshToken
    let decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
    let user = await userModel.findById(decode.userId)

    if (!user) {
      return res.status(401).json({
        message: "Unauthoried user"
      })
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: "Unauthoried user"
      })
    }

    //generate new access token
    let accessToken = generateAccessToken(user._id)

    //save accesstoken inside cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    })

    return res.status(200).json({
      message: "access token generated"
    })

  } catch (err) {
    console.log("Error from backend api", err);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

module.exports = {
  registeredController,
  loggedInController,
  getRefreshTokenController,
}