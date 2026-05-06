const todoModel = require("../models/todo.models")

//create
let createListController = async (req, res) => {
  try {
    let { name, description } = req.body
    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let newList = await todoModel.create({
      name,
      description
    })

    return res.status(201).json({
      message: "List created successfully.",
      newList
    })

  } catch (err) {
    console.log("Error from Api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

//read
let readListController = async (req, res) => {
  try {

    let allList = await todoModel.find()

    //check empty array
    if (allList.length === 0) {
      return res.status(200).json({
        message: "No lists found.",
        allList: []
      })
    }

    return res.status(200).json({
      message: "Lists fetched successfully.",
      allList
    })

  } catch (err) {
    console.log("Error from Api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })

  }
}

let updateListController = async (req, res) => {
  try {
    
  } catch (err) {
    console.log("Error from Api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}



module.exports = {
  createListController,
  readListController
}