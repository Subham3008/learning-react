const express = require('express')
const app = express() //server instance create karna

app.get('/',(req,res)=>{
  res.send('Hello from Backend')
})

app.get('/about',(req,res)=>{
  res.send("About page")
})

app.get('/home',(req,res)=>{
  res.send('This is Home page')
})

app.listen(3000)//server ko chalana