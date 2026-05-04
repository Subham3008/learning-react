const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: "Description"
    },
    category: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS"],
      default: "MEN",
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
      }
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  }
)

const productModel = mongoose.model("productItem", productSchema)

module.exports = productModel