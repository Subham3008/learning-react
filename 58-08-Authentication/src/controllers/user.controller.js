const userModel = require("../models/user.model");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

//register controll
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

//login controller

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExists = await userModel.findOne({
      email
    })

    if (!isExists) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    let comparePass = await bcrypt.compare(password, isExists.password)

    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid credential"
      })
    }

    let token = jwt.sign({ id: isExists._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("token", token)

    return res.status(200).json({
      message: "User logged In successfully.",
      user: isExists
    })

  } catch (err) {
    console.log("Error from backend Api:", err);

    return res.status(500).json({
      message: "Internal server error"
    })

  }
}

module.exports = {
  registerController,
  loginController,
}