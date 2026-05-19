const express = require("express")
require("dotenv").config()
const fileRoute = require("./routes/files.route")

const app = express()
app.use(express.json())

// app.use(express.urlencoded({ extended: true })) // iska kaam hai HTML form se aane wale URL-encoded data ko parse karna taaki aap req.body me data access kar sako

app.use("/api/file", fileRoute)

module.exports = app