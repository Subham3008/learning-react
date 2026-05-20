const mongoose = require("mongoose")

const fileSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    name: String,
  },
  {
    timestamps: true
  }
)

const fileModel = mongoose.model("files", fileSchema)

module.Schema = fileModel