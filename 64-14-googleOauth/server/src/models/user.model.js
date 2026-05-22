const mongoose = require("mongoose")

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "facebook"]
    },
    provider_id: {
      type: String,
    },
  },
  {
    timestamps: true
  }
)


const userModel = mongoose.model("users", userSchema)

module.exports = userModel