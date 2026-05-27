const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  refreshTokenHash: {
    type: String
  },

  passwordResetToken: {
    type: String,
    select: false,
  },

  passwordResetExpires: {
    type: Date,
    select: false,
  },

  passwordChangedAt: {
    type: Date,
  },
},
  {
    timestamps: true
  }
);

const userModel = mongoose.model("User", userSchema)

module.exports = userModel