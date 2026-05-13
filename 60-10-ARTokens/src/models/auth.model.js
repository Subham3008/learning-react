const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Nmae is required"]
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"]
    },
    mobile: {
      type: String,
      trim: true,
      required: [true, "Mobile is required"],
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)

//password hash
userSchema.pre('save', function () {
  if (!this.isModified('password')) return // this line is very important

  this.password = bcrypt.hashSync(this.password, 10)
})

//compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel
