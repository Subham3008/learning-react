const jwt = require("jsonwebtoken")
const userModel = require("../models/auth.model")

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken

    if (!token) {
      return res.status(404).json({
        message: "Token not found"
      })
    }

    let decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized user"
      })
    }

    let user = await userModel.findById(decode.userId)
    // console.log(user);

    req.user = user
    next()

  } catch (err) {
    return res.status(500).json({
      message: "Error in middleware"
    })
  }
}

module.exports = authMiddleware