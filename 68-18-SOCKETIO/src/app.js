const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("Hello world")
})

//------Implement SSE----------->>
app.get("/sse", (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const intervalId = setInterval(() => {
    res.write(`data: some data in JSON formate\n\n`)
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId)
    res.end()
  }, 10000)
})

module.exports = app