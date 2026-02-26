const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

/*require routes */
const authRouter = require('./router/auth.route')
const postRouter = require('./router/post.route')
const userRouter = require('./router/user.route')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))

/*using routes */
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)


module.exports = app