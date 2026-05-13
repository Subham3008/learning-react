const userModel = require("../models/user.model");

const registeredController = async (req, res) => {
  try {

    let { name, email, password, mobile } = req.body

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExisted = await userModel.findOne({ email })

    //send conflict msg to client
    if (isExisted) {
      return res.status(409).json({
        message: "This email alredy exist.",
      })
    }

    let newUser = await userModel.create({
      name,
      email,
      password,
      mobile,
    })

    //token call from user.model.js
    let token = newUser.generateJWT()

    //save token in cookie 
    res.cookie("token", token)

    return res.status(201).json({
      message: "User create successfully."
    })

  } catch (err) {
    console.log("Error from backend api", api);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

const loggedInController = async (req, res) => {
  try {
    let { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let isExisted = await userModel.findOne({ email })

    if (!isExisted) {
      return res.status(404).json({
        message: "User not found.",
      })
    }

    //password compare
    let comparePass = isExisted.comparePassword(password)
    if(!comparePass){
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    //token create
    let token = isExisted.generateJWT()

    //save token inside cookie
    res.cookie("token", token)

    return res.status(200).json({
      message: "User loggedIn successfully.",
      user: isExisted
    })


  } catch (err) {
    console.log("Error from backend api", err);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

module.exports = {
  registeredController,
  loggedInController
}