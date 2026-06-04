const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)  //"Ek Socket.IO server banao aur usko existing HTTP server ke saath attach kar do."

/**
 * Socket io kam karta ha entires of events.
 * When a new user connects to the server via socket io then use this line
 * io = server
 * socket = a single user
 */
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("tesla", (msg) => {

    console.log(msg);


    io.emit("musk", {
      ...msg,
      timestamp: new Date()
    })
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  })

})

app.get("/", (req, res) => {
  res.send("Hello world")
})

//------Implement SSE----------->>
app.get("/sse", (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream') //Browser ko batata hai ki ye normal HTTP response nahi hai. Ye event stream hai jisme server continuously data bhejega.
  res.setHeader('Cache-Control', 'no-cache') //Browser ya proxy ko response cache na karne ke liye bolta hai. Har baar fresh data milega.
  res.setHeader('Connection', 'keep-alive') //Connection ko open rakhta hai. Server baar-baar data bhej sakta hai bina connection close kiye.

  const intervalId = setInterval(() => {
    res.write(`data: some data in JSON formate\n\n`)
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId)
    res.end()
  }, 10000)
})

module.exports = {
  app,
  httpServer
}