const express = require("express")
const productModel = require("./model/product.model")

const app = express()
app.use(express.json())

//create product
app.post("/create-product", async (req, res) => {

  try {
    let { name, price, description, category, stock } = req.body

    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({
        message: "All fields are required",
      })
    }

    let newProduct = await productModel.create({
      name,
      price,
      description,
      category,
      stock
    })

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})


//Get all Products
app.get("/products", async (req, res) => {

  try {

    let allProducts = await productModel.find()

    return res.status(200).json({
      message: "Products fetched successfully",
      productData: allProducts,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})


//Get single Products
app.get("/product/:id", async (req, res) => {

  try {

    let { id } = req.params
    let singleProduct = await productModel.findById(id)

    if (!singleProduct) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    return res.status(200).json({
      message: "Single Product fetched successfully",
      singleProduct,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})

//Update product by ID
app.put("/product/update/:id", async (req, res) => {

  try {
    let { name, price, description, category, stock } = req.body

    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({
        message: "All fields are required",
      })
    }

    let { id } = req.params

    let updatedProduct = await productModel.findByIdAndUpdate(id,
      {
        name,
        price,
        description,
        category,
        stock
      },
      {
        new: true
      }
    )

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }


    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})

//Delete product by ID
app.delete("/product/delete/:id", async (req, res) => {

  try {

    let { id } = req.params
    let deletedProduct = await productModel.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product delete successfully",
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    })
  }
})


module.exports = app