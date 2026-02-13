const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username is already exists"],
    require: [true, "Username is required"]
  },
  email: {
    type: String,
    unique: [true, "This email already exists"],
    require: [true, "Email is required"]
  },
  password: {
    type: String,
    require: [true, "Password is required"]
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/0qdaekejbq/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
  }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel