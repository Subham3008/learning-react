const express = require("express")
require("dotenv").config()
const cors = require("cors")

const cookieparser = require("cookie-parser")
const passport = require("../src/config/passport")

const authRouter = require("./routes/auth.route")
const profileRouter = require("./routes/profile.route")
const projetRouter = require("./routes/projects.route")
const errorMiddleware = require("./middleware/errorMiddleware")
const cacheInstance = require("./config/caching")


const app = express()

//---------redis connection---------->>
cacheInstance.on("connect", () => {
  console.log("Redis connected");

})

cacheInstance.on("error", (err) => {
  console.log("Redis error:", err);

})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieparser())



//auth route--------->>
app.use("/api/auth", authRouter)

//profile route-------------->>
app.use("/api/profile", profileRouter)

//project route---------->>
app.use("/api/project", projetRouter)

app.use(errorMiddleware)

module.exports = app