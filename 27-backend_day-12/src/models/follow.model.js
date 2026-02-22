const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
  followers: {
    type: String,
  },
  followee: {
    type: String,
  }
}, {
  timeStamps: true
})

const followeModel = mongoose.model("follows", followSchema)

module.exports = followeModel