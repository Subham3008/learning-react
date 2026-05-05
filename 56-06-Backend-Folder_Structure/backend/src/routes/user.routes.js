const express = require("express")

const { userRegisterdController, userLoggedInController } = require("../controllers/user.controllers")



let router = express.Router()

router.post("/register", userRegisterdController)
router.get("/login", userLoggedInController)

module.exports = router