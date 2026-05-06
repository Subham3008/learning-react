const express = require("express")
const listRouter = require("./routes/todo.routes")

const app = express()
//middleware
app.use(express.json())

app.use("/api/lists", listRouter)

module.exports = app