const jwt = require("jsonwebtoken")

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}