const Imagekit = require("imagekit")

const storageInstance = new Imagekit({  //create Imagekit instance, Ye line basically ImageKit ke server se connection/configuration setup karti hai. “ImageKit ko bata rahe ho ki kis account se upload karna hai.”
  urlEndpoint: process.env.IMG_URL_ENDPOINT,
  privateKey: process.env.IMG_PRIVATE_KEY,
  publicKey: process.env.IMG_PUBLIC_KEY
})

let sendFiles = async (file, filename) => {  //iss function ka kam ha File ko ImageKit par upload karna.
  let options = {
    file: file,
    fileName: filename,
  }

  return await storageInstance.upload(options)
}

module.exports = sendFiles

