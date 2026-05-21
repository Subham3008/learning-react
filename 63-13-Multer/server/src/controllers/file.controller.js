const { uploadFileService, uploadMultiFileService } = require("../services/uploadFiles.service");

let uploadFileContoller = async (req, res) => {
  try {
    let file = req.file

    let result = await uploadFileService(file)

    return res.status(201).json({
      message: "File uploded successfully.",
      file: result,
    })

  } catch (err) {
    console.log("server api error", err);

    throw new Error("Internal server error.")
    // return res.status(500).json({
    //   message: "Internal server error."
    // })
  }
}

let multipleUploadFilesContoller = async (req, res) => {
  try {
    let files = req.files

    let result = await uploadMultiFileService(files)

    return res.status(201).json({
      message: "Files uploded successfully.",
      file: result,
    })

  } catch (err) {
    console.log("server api error", err);

    throw new Error("Internal server error.")
    // return res.status(500).json({
    //   message: "Internal server error."
    // })
  }
}


module.exports = {
  uploadFileContoller,
  multipleUploadFilesContoller,
}