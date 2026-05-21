const express = require("express")
const { uploadFileContoller, multipleUploadFilesContoller } = require("../controllers/file.controller")
const upload = require("../config/multer")

const router = express.Router()

router.post("/upload", upload.single("image"),uploadFileContoller)
router.post("/multi-upload", upload.array("images", 5),multipleUploadFilesContoller)

module.exports = router