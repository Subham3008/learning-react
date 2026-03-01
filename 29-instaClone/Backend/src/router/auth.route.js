const express = require('express')
const authController = require('../controllers/auth.controller')
const identifyerUser = require("../middleware/auth.middleware")

const authRouter = express.Router()

{/*--register---*/ }
authRouter.post('/register', authController.registerController)

{/*--login--*/ }
authRouter.post('/login', authController.loginController)

{/*--get-me--
  * @route GET /api/auth/get-me
  * get the curretly logged in user's information
  * access private
  */ }
authRouter.get('/get-me', identifyerUser, authController.getMeController)

module.exports = authRouter