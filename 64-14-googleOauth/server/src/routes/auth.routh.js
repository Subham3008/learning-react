const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))//passport.authenticate() ek method hai jo call deta hai jo strategy hai app.js ke andar, idhar google hai to yea google ko call dega

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    let token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie("token", token)

    return res.send("Ok")
  })


module.exports = router