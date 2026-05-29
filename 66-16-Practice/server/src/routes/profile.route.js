const express = require("express")
const { getCurrentUserProfileController, updateProfileController, searchProfileController, getSingleProfileController } = require("../controllers/profile.controller")
const verifyJwt = require("../middleware/auth.middleware")
const upload = require("../middleware/multer.middleware")

const router = express.Router()

//get user profile Api
router.get("/me", verifyJwt, getCurrentUserProfileController)

//profile update Api
router.patch("/update",
  verifyJwt,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "banner", maxCount: 1 },]),
  updateProfileController)

//search profile api
router.get("/search", verifyJwt, searchProfileController)

//get single profile api
router.get("/:id", verifyJwt, getSingleProfileController)


module.exports = router