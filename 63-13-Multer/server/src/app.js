const express = require("express")
require("dotenv").config();
const cors = require("cors")

const fileRouter = require("./routes/file.route")

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use("/api/file", fileRouter)

module.exports = app