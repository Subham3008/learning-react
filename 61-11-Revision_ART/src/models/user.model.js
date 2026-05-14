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
    mobile: {
      type: String,
      trim: true,
      required: [true, "Mobile No. is reuired."]
    },
    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true
  }
)

//password hashing
userSchema.pre("save", function(){
  if(!this.isModified('password')) return
  this.password = bcrypt.hashSync(this.password, 10)
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel