const express = require("express")
require("dotenv").config()
const cookieparser = require("cookie-parser")

const authRouter = require("./routes/auth.route")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()
app.use(express.json())
app.use(cookieparser())



app.use("/api/auth", authRouter)

app.use(errorMiddleware)

module.exports = app