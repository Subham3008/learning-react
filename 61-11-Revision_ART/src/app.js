const express = require("express")
const authRouter = require("./routers/auth.router")
require("dotenv").config()
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookieParser())

//routers
app.use("api/auth", authRouter)

module.exports = app