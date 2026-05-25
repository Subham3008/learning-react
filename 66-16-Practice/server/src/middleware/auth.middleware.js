const jwt = require("jsonwebtoken")
const APiError = require("../utils/apiError")
const userModel = require("../models/user.model")

const verifyJwt = async (req, res, next) => {

  const token = req.cookies?.accessToken

  if (!token) {
    throw new APiError(401, "Unauthorized access.")
  }

  const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

  if (!decode) {
    throw new APiError(401, "Unauthorized access.")
  }

  const user = await userModel.findById(decode.userId).select("-passwordHash -refreshTokenHash")

  if (!user) {
    throw new APiError(404, "User not found.")
  }

  req.user = user

  next()
}

module.exports = verifyJwt