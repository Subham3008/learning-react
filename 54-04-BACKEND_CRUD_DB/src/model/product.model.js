const mongoose = require("mongoose")

let productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
  },
  {
    timestamps: true,
  }
)

let productModel = mongoose.model("product", productSchema)

module.exports = productModel