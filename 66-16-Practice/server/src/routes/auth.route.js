const express = require("express")
const { registerController, loginController, getMeController, googleCallbackController } = require("../controllers/auth.controller")
const verifyJwt = require("../middleware/auth.middleware")
// const passport = require("passport")

const passport = require("../config/passport")

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", verifyJwt, getMeController)

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