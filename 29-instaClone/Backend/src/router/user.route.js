const express = require('express')
const identifyerUser = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controller')

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userId
 * @description follow a user
 * @access Private
 */
userRouter.post('/follow/:username', identifyerUser, userController.followUserController)

/**
 * @route POST /api/users/follow/accept/:userId
 * @description accept user follow request
 * @access Private
 */
userRouter.post('/follow/accept/:username', identifyerUser, userController.acceptFollowRequestController)

/**
 * @route POST /api/users/follow/reject/:userId
 * @description reject user follow request
 * @access Private
 */
userRouter.post('/follow/reject/:username', identifyerUser, userController.rejectFollowRequestController)

/**
 * @route POST /api/users/unfollow/:userId
 * @description unfollow a user
 * @access Private
 */

userRouter.post('/unfollow/:username', identifyerUser, userController.unfollowUserController)

module.exports = userRouter