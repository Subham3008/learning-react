const { Server } = require("socket.io")

const initSocket = (httpServer) => {

  const io = new Server(httpServer)

  io.on("connection", (socket) => {
    console.log("A user is connected");


    socket.on("disconnect", () => {
      console.log("A user is Disconnected");
    })
  })

}

module.exports = initSocket