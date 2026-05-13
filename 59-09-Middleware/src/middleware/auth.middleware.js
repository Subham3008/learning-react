const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token

    if (!token) {
      return res.status(404).json({
        message: "Token not found"
      })
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET)

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized user"
      })
    }

    let user = await userModel.findById(decode.id)
    // console.log(user);
    
    next()

  } catch (err) {
    return res.status(500).json({
      message: "Error in middleware"
    })
  }
}

module.exports = authMiddleware