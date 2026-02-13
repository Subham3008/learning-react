const express = require('express')

const authRouter = express.Router()

/*--register---*/
authRouter.post('/register', async(req, res)=>{
  const {username,email,password,profileImage,bio} = req.body
  
})


module.exports = authRouter