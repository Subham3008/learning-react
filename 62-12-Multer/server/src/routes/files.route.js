const express = require("express")
const upload = require("../config/multer");
const sendFiles = require("../config/imagekit");

const router = express.Router()


//this approach is single file uploading approach
// router.post("/upload", upload.single("image"), async (req, res) => {

//   try {

//     let file = req.file

//     let uploadedFiles = await sendFiles(
//       file.buffer,
//       file.originalname
//     )

//     console.log(uploadedFiles)

//     res.json({
//       success: true,
//       data: uploadedFiles
//     })

//   } catch (err) {

//     console.log(err)

//     res.status(500).json({
//       error: err.message
//     })
//   }

// })

//multiple file uploading approach
router.post("/upload", upload.array("images", 5), async (req, res) => {

  try {

    let files = req.files

    let uploadedFiles = await Promise.all(files.map(async (elem) => {
      return await sendFiles(
        elem.buffer,
        elem.originalname
      )
    }))

    console.log(uploadedFiles)

    res.json({
      success: true,
      data: uploadedFiles
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })
  }

})



module.exports = router

