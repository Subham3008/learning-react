const sendFiles = require("../config/imagekit")
const {fileModel, filesModel} = require("../models/file.model")

let uploadFileService = async (file) => {
  if (!file) {
    throw new Error("File is required.")
  }

  let uploadFiles = await sendFiles(file.buffer, file.originalname)

  let newFile = await fileModel.create({
    name: "trial 1",
    image: uploadFiles.url,
  })

  return newFile
}

let uploadMultiFileService = async (files) => {
  if (!files?.length) {
    throw new Error("File is required.")
  }

  let uploadMultiFiles = await Promise.all(files.map(async (elem) => {
    return await sendFiles(elem.buffer, elem.originalname)
  })
  )
  let newFiles = await filesModel.create({
    name: "trial 1",
    images: uploadMultiFiles.map(file => file.url),
  })

  return newFiles
}

module.exports = {
  uploadFileService,
  uploadMultiFileService,
}