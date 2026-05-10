const express = require("express")
const userRouter = require("./routers/user.router")
const cookieParse = require("cookie-parser")

const app = express()
app.use(express.json())
app.use("/api/users", userRouter)
app.use(cookieParse())

module.exports = app