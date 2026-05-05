const userModel = require("../models/user.model")

let userRegisterdController = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }
    let newUser = await userModel.create({
      name,
      email,
      mobile,
      password
    })
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    })
  } catch (err) {
    console.log("Error from backend api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

let userLoggedInController = async (req, res) => {
  try {
    let users = await userModel.findOne()

    return res.status(200).json({
      message: "User fetched successfully.",
      allUser: users
    })

  } catch (err) {
    console.log("Error from backend api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}

module.exports = { userRegisterdController, userLoggedInController }