const express = require("express")
const { registeredController, loggedInController, getRefreshTokenController } = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register", registeredController)
router.post("/login", loggedInController)
router.get("/getRefreshToken", getRefreshTokenController)

module.exports = router