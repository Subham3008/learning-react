const userModel = require("../models/user.model");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")


const registerController = async (req, res) => {
  try {
    //Authentication--------------->>
    let { name, password, email, mobile } = req.body
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are reuired.",
      })
    }

    let isExists = await userModel.findOne({ email })
    if (isExists) {
      return res.status(409).json({
        message: "This email Id is already exists."
      })
    }

    //hash password
    let hashPass = await bcrypt.hash(password, 10)

    //create new user in DB
    let newUser = await userModel.create({
      name,
      email,
      password: hashPass,
      mobile
    })

    //Authoriation-------------------->>
    //token creation
    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    //token save inside cookies
    res.cookie("token", token)

    return res.status(201).json({
      message: "User created successfully.",
      user: newUser
    })

  } catch (err) {
    console.log("Error from backend api:", err);
    return res.status(500).json({
      message: "Internal server error"
    })

  }
}

module.exports = {
  registerController
}