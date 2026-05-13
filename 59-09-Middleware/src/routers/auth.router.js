const express = require("express")
const { registeredController, loggedInController } = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register", registeredController)
router.post("/login", loggedInController)

module.exports = router