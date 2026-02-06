const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

/*-POST METHOD */
app.post('/api/notes', async (req, res) => {
  const { title, description } = req.body
  const notes = await noteModel.create({
    title, description
  })
  res.status(201).json({
    message: 'Note created successfully',
    notes
  })
})

/*-GET METHOD */
app.get('/api/notes', async (req, res) => {
  const notes = await noteModel.find()
  res.status(200).json({
    message: "Note fetched successfully",
    notes
  })
})

/*-DELETE METHOD */
app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    message: 'Note Deleted Successfully'
  })
})

/*-PATCH METHOD */
app.patch('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const { description } = req.body
  await noteModel.findByIdAndUpdate(id, { description })

  res.status(200).json({
    message: 'Note updated successfully'
  })
})


/*-wild card api */
app.use('*name', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})


module.exports = app