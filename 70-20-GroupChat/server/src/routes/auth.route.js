const express = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");

const router = express.Router();

/**
 * POST /api/auth/register
 * description: name, email, password needed from req.body
 * public route
 */
router.post("/register", registerController);

/**
 * POST /api/auth/login
 * description: email, password needed from req.body
 * public route
 */
router.post("/login", loginController);

module.exports = router;