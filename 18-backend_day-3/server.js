const express = require('express')
const port = 3000
const app = express()
app.use(express.json())// I can read data for this line
const notes = []

app.post('/notes', (req, res) => {
  console.log(req.body);
  notes.push(req.body)
  res.send('Notes Created')
})

app.get('/notes', (req, res) => {
  res.send(notes)
})

app.listen(port, () => {
  console.log(`Server is running ${port} port`);
})