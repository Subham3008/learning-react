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

const filesSchema = mongoose.Schema(
  {
    images: [{
      type: String,
      required: true,
    }],

    name: String,
  },
  {
    timestamps: true
  }
)

const fileModel = mongoose.model("files", fileSchema)
const filesModel = mongoose.model("multi-files", filesSchema)

module.exports = {
  fileModel,
  filesModel,
}