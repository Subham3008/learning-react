const express = require('express')
const cookieParser = require('cookie-parser')

/*require routes */
const authRouter = require('./router/auth.route')
const postRouter = require('./router/post.route')
const userRouter = require('./router/user.route')


const app = express()
app.use(express.json())
app.use(cookieParser())

/*using routes */
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)


module.exports = app