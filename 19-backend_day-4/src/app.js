const express = require('express')
const app = express()

const notes = []
app.use(express.json())

/*send data from client to server using post method */
app.post('/notes', (req, res) => {
  notes.push(req.body)
  res.status(201).json({
    message: "note created successfully"
  })
})

/* retrive data from server using get */
app.get('/notes', (req, res) => {
  res.status(200).json({
    notes: notes
  })
})

/* delete data */
app.delete('/notes/:index', (req, res) => {
  delete notes[req.params.index]
  res.status(204).json({
    message: "note deleted successfully"
  })
})

/* update data */
app.patch('/notes/:index', (req, res) => {
  notes[req.params.index].description = req.body.description
  // notes[req.params.index].title = req.body.title
  res.status(200).json({
    message: "note update successfully"
  })
})


module.exports = app