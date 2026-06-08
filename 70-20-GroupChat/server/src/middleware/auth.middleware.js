const jwt = require("jsonwebtoken");
const { default: User } = require("../models/user.model");
const ApiError = require("../utils/apiError");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Access token is required"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Access token is required"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return next(new ApiError(401, "Invalid access token"));
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;