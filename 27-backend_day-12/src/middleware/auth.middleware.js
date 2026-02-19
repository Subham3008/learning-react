const jwt = require('jsonwebtoken')
require('dotenv').config()

async function identifyerUser(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "token not provided, unauthorized access"
    })
  }

  let decoded = null

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized"
    })
  }

  req.user = decoded
  next()
}

module.exports = identifyerUser