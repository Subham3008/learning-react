const express = require("express")
const authRouter = require("./routers/auth.router")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/errorMiddleware")


const app = express()
app.use(express.json())
app.use(cookieParser())

//routers
app.use("/api/auth", authRouter)

//global error handling middleware
app.use(errorMiddleware)

module.exports = app