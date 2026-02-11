const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { log } = require('console')


const authRouter = express.Router()

/*--register--*/
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const isUserExists = await userModel.findOne({ email })
  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists with this email"
    })
  }

  const user = await userModel.create({
    name, email, password: crypto.createHash('sha256').update(password).digest('hex')
  })

  const token = jwt.sign({
    id: user._id,
  },
    process.env.JWT_SECRET, { expiresIn: '1h' })

  res.cookie("token", token)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: user.name,
      email: user.email
    }
  })
})

/*--login--*/
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    })
  }

  const isValidPassword = user.password === crypto.createHash('sha256').update(password).digest('hex')
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid password"
    })
  }

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.cookie('token', token)

  res.json({
    message: "User logged in successfully",
    user: {
      name: user.name,
      email: user.email
    }
  })
})

/*--get-me----*/
authRouter.get('/get-me', async (req, res) => {
  const token = req.cookies.token

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await userModel.findById(decoded.id)
  res.json({
    name: user.name,
    email: user.email
  })

})


module.exports = authRouter