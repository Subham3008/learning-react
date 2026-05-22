const express = require("express")
require("dotenv").config();
const cors = require("cors")
const passport = require("passport")
const authRoute = require("./routes/auth.routh");
const userModel = require("./models/user.model");
let GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require("jsonwebtoken")


const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

// Passport middleware
app.use(passport.initialize()) //yea middleware hai jisse passport express se combine hua hai

// Google strategy register
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {

    try {
      console.log("GOOGLE HIT")
      console.log(profile)

      let name = profile.name?.givenName
      let email = profile.emails?.[0]?.value

      if (!email) {
        return cb(new Error("Email not found"))
      }

      let isExisted = await userModel.findOne({ email })

      if (isExisted) {
        return cb(null, isExisted)
      }

      let newUser = await userModel.create({
        name,
        email,
        provider: "google",
        provider_id: profile.id
      })

      return cb(null, newUser)

    } catch (err) {
      console.log("STRATEGY ERROR:", err)
      return cb(err)
    }
  }
))



app.use("/api/auth", authRoute)

app.use("/", (req, res) => {
  res.send("redirect nhi hua")
})


module.exports = app