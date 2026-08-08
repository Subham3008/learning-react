const express = require("express")
const { createListController, readListController, updateListController, deleteListController } = require("../controllers/todo.controllers")

const router = express.Router()

//create todo
router.post("/create", createListController)

//read todo
router.get("/", readListController)

//update todo
router.put("/update/:id", updateListController)

//delete todo
router.delete("/delete/:id", deleteListController)


module.exports = router