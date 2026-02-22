const express = require('express')
const identifyerUser = require('../middleware/auth.middleware')
const  userController = require('../controllers/user.controller')

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
 * @access Private
 */
userRouter.post('/follow/:username',identifyerUser, userController.followUserController)

/**
 * @route POST /api/users/unfollow/:userId
 * @description unfollow a user
 * @access Private
 */

userRouter.post('/unfollow/:username', identifyerUser, userController.unfollowUserController)

module.exports = userRouter