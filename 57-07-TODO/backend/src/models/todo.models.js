const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
   description:{
    type: String,
    required: true
  }
})

const todoModel = mongoose.model("todoData", todoSchema)

module.exports = todoModel