const express = require("express")
const { registerController, loginController, registerPage, forgotPasswordPage, resetPasswordPage, forgotPasswordController, resetPassword } = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)

//forget password routes
router.get("/registerPage", registerPage)
router.get("/forgotPasswordPage", forgotPasswordPage);
router.post("/forgot-password", forgotPasswordController);

router.get("/resetPasswordPage/:token", resetPasswordPage);
router.post("/reset-password/:token", resetPassword);



module.exports = router