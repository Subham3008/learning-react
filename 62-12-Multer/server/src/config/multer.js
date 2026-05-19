const multer = require("multer")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {  // yeha par yea batana hota hai kaha par file store hona chahiye 
//     console.log("from req->", req);
//     console.log("from file-->", file);


//     cb(null, "uploads/")

//   },
//   filename: (req, file, cb) => { // yeha par yea batana hota hai kis name se file store hona chahiye 
//     cb(null, file.originalname)
//   },
// })

let storage = multer.memoryStorage()

// Yahan aap Multer ko configuration de rahe ho:

// files kaha save hongi
// filename kya hoga
// upload ka behavior kya hoga
let upload = multer({ storage })  //Ye line ek Multer middleware instance banati hai. 

module.exports = upload
