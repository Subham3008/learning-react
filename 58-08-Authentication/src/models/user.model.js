const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required."]
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required."]
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required."]
  },
  mobile: {
    type: String,
    trim: true,
    required: [true, "Mobile No. is required."]
  }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel