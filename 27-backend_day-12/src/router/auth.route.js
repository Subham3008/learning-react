const express = require('express')
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

/*--register---*/
authRouter.post('/register', async (req, res) => {
  const { username, email, password, profileImage, bio } = req.body

  const isUserExists = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists" + (isUserExists.email == email ? "Email already exists" : "Username already exists")
    })
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex")

  const user = await userModel.create({
    username,
    email,
    password: hash,
    profileImage,
    bio
  })

  const token = jwt.sign({
    id: user._id
  },
    process.env.JWT_SECRET, { expiresIn: "1d" })

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio
    }
  })

})


module.exports = authRouter