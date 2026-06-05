const jwt = require("jsonwebtoken")
const APiError = require("../utils/apiError")
const userModel = require("../models/user.model")
const cacheInstance = require("../config/caching")

const verifyJwt = async (req, res, next) => {

  const token = req.cookies?.accessToken

  if (!token) {
    throw new APiError(401, "Unauthorized access.")
  }

  // Check blacklist first
  const isBlacklisted = await cacheInstance.get(
    `blacklist:${token}`
  );

  if (isBlacklisted) {
    throw new APiError(401, "Token has been revoked.");
  }

  const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

  const user = await userModel.findById(decode.userId).select("-passwordHash -refreshTokenHash")

  if (!user) {
    throw new APiError(404, "User not found.")
  }

  req.user = user

  next()
}

module.exports = verifyJwt