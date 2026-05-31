const express = require("express")
const verifyJwt = require("../middleware/auth.middleware")
const { createProjectController } = require("../controllers/project.controller")
const upload = require("../middleware/multer.middleware")

const router = express.Router()

router.post("/create",verifyJwt,upload.single("thumbnail") ,createProjectController)

module.exports = router