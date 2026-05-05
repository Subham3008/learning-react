const express = require("express")
let userRouter = require("./routes/user.routes")

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)

module.exports = app