const express = require("express")
const { default: mongoose } = require("mongoose")
const productModel = require("./model/product.model")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))


//create product
app.post("/products", async (req, res) => {
  try {
    let { name, description, amount, currency, category, stock } = req.body
    if (!name || !amount || !stock) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let newProduct = await productModel.create({
      productName: name,
      description,
      price: {
        amount,
        currency
      },
      category,
      stock
    })

    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct
    })

  } catch (error) {
    console.log("Api fetched error:", error);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
})

module.exports = app
