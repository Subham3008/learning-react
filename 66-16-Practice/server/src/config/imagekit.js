let Imagekit = require("imagekit")

let storageInstance = new Imagekit({
  urlEndpoint: process.env.IMG_URL_ENDPOINT,
  publicKey: process.env.IMG_PUBLIC_KEY,
  privateKey: process.env.IMG_PRIVATE_KEY,

})

let sendFiles = async (file, fileName) => {
  try {
    let options = {
      file,
      fileName,
      folder: "kodex",
    }
    return await storageInstance.upload(options)
  } catch (err) {
    console.log("Imagekit error", err);

  }
}

module.exports = sendFiles