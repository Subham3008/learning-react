const express = require("express")
const { createListController, readListController } = require("../controllers/todo.controllers")

const router = express.Router()

//create todo
router.post("/create", createListController)

//read todo
router.get("/", readListController)


module.exports = router