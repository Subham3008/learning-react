const express = require("express")
const cors = require("cors")
const cookieparser = require("cookie-parser")
require("dotenv").config()
const authRoutes = require("./routes/auth.route");

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieparser())

app.use("/api/auth", authRoutes);

module.exports = app
