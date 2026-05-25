const express = require("express")
const { registerController, loginController, getMeController } = require("../controllers/auth.controller")
const verifyJwt = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", verifyJwt, getMeController)

module.exports = router