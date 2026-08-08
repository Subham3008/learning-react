const express = require("express")
const listRouter = require("./routes/todo.routes")
const cors = require("cors")

const app = express()
//middleware
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use("/api/lists", listRouter)

module.exports = app