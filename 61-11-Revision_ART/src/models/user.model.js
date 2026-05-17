const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is reuired."]
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is reuired."]
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is reuired."]
    },
    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel