const followeModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req, res) {
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself"
    })
  }

  const isAlreadyFollowing = await followeModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  const isUserExists = await userModel.findOne({
    username: followeeUsername
  })

  if (!isUserExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exists"
    })
  }

  if (isAlreadyFollowing) {
    return res.status(409).json({ //update 200 to 409
      message: `You are already following ${followeeUsername}`,
      follow: isAlreadyFollowing
    })
  }

  const followRecord = await followeModel.create({
    follower: followerUsername,
    followee: followeeUsername
  })

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord
  })
}

async function acceptFollowRequestController(req, res) {
  const currentUsername = req.user.username
  const requesterUsername = req.params.username

  const followRequest = await followeModel.findOne({
    follower: requesterUsername,
    followee: currentUsername,
    status: "pending"
  })

  if (!followRequest) {
    return res.status(404).json({
      message: "No pending follow request found"
    })
  }

  followRequest.status = "accepted"
  await followRequest.save()

  res.status(200).json({
    message: `${requesterUsername} is now following you`,
    follow: followRequest
  })
}

async function rejectFollowRequestController(req, res) {
  const currentUser = req.user.username
  const requesterUsername = req.params.username

  const followRequest = await followeModel.findOneAndDelete({
    follower: requesterUsername,
    followee: currentUser,
    status: "pending"
  })

  if (!followRequest) {
    return res.status(404).json({
      message: "No pending follow request found"
    })
  }

  res.status(200).json({
    message: "Follow request rejected"
  })
}


async function unfollowUserController(req, res) {
  const followUsername = req.user.username
  const followeeUsername = req.params.username

  const isUserFollowing = await followeModel.findOne({
    follower: followUsername,
    followee: followeeUsername,
    status: "accepted"
  })

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`
    })
  }

  await followeModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  })
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController
}