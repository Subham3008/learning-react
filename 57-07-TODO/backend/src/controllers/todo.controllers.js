const todoModel = require("../models/todo.models")

//create list
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

//read list
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

//updated list
let updateListController = async (req, res) => {
  try {
    let { id } = req.params
    if (!id) {
      return res.status(400).json({
        message: "Id not found"
      })
    }

    let { name, description } = req.body
    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required."
      })
    }

    let updatedList = await todoModel.findByIdAndUpdate(id,
      {
        name,
        description
      },
      {
        new: true
      }
    )

    if (!updatedList) {
      return res.status(404).json({
        message: "List not found."
      });
    }

    return res.status(200).json({
      message: "List updated successfully.",
      updatedList
    })

  } catch (err) {
    console.log("Error from Api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}

//delete list
let deleteListController = async (req, res) => {
  try {
    let { id } = req.params
    if (!id) {
      return res.status(400).json({
        message: "Id not found"
      })
    }

    let deleteList = await todoModel.findByIdAndDelete(id)

    if (!deleteList) {
      return res.status(404).json({
        message: "List not found."
      });
    }

    return res.status(200).json({
      message: "List deleted successfully.",
      deleteList
    })


  } catch (err) {
    console.log("Error from Api:", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
}


module.exports = {
  createListController,
  readListController,
  updateListController,
  deleteListController
}