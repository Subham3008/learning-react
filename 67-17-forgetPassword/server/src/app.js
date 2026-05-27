require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes")
const errorMiddleware = require("./middleware/errorMiddleware")
const ejs = require("ejs")
const path = require("path");
const { urlencoded } = require("body-parser");
const app = express();



app.use(express.json());
app.use(urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());


app.use("/api/auth", authRouter)
app.use(errorMiddleware)

module.exports = app