const express = require("express")
const { registerController, loginController, getMeController, googleCallbackController, logoutController, refreshTokenController } = require("../controllers/auth.controller")
const verifyJwt = require("../middleware/auth.middleware")
// const passport = require("passport")

const passport = require("../config/passport")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", verifyJwt, getMeController)
router.post("/refresh-token", refreshTokenController);
router.post("/logout", verifyJwt, logoutController)

// router.post("/logout",)

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
}))

router.get("/google/callback", passport.authenticate("google",
  {
    failureRedirect: "/",
    session: false
  }
), googleCallbackController)

module.exports = router