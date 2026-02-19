const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Followers is required"]
  },
  followee: {
    ype: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Followee is required"]
  },
  timeStamps: true
})

const followeModel = mongoose.model("follows", followSchema)

module.exports = followeModel