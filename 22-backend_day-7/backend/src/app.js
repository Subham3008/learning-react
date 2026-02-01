const express = require("express")
const noteModel = require('./models/note.model')

const app = express()
app.use(express.json())

/*-post method */

app.post('/notes', async (req, res) => {
  const { title, description } = req.body
  const note = await noteModel.create({
    title, description
  })

  res.status(201).json({
    messaage: "note created succesfully",
    note
  })
})

/*-get method */
app.get("/notes", async (req, res) => {
  const note = await noteModel.find({
    title, description
  })

  res.status(200).json({
    messaage: "note fatched successfully",
    note
  })
})

/*-Delete method */
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id
  await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    messaage: "Note deleted successfully"
  })
})

/*-patch method */
app.patch("/notes/:id", (req, res) => {
  const id = req.params.id
  const { description } = req.body
  noteModel.findByIdAndUpdate(id, { description })
  res.status(200).json({
    messaage: "Note updated successfully"
  })
})


module.exports = app