const express = require('express')
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyerUser = require('../middleware/auth.middleware')

const postRouter = express.Router()

postRouter.post("/", upload.single("image"), identifyerUser, postController.createPostController)
postRouter.get("/", identifyerUser, postController.getPostController)
postRouter.get("/details/:postId", identifyerUser, postController.getPostDetailsController)

/**
 * @route POST /api/posts/like/:postId
 */
postRouter.post("/like/:postId", identifyerUser, postController.likePostController)

module.exports = postRouter