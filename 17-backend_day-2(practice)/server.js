const express = require('express')
const app = express() //create instance

app.get('/', (req, res) => {
  res.send("hello form backend")
})

app.get('/about', (req, res) => {
  res.send("ABOUT PAGE")
})

app.get('/services', (req, res) => {
  res.send("SERVICE PAGE")
})

app.get('/home', (req, res) => {
  res.send("HOME PAGE")
})

app.listen('3000')//start server