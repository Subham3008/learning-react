import { Server, Socket } from "socket.io";

let voteCounts = {
  yes: 0,
  no: 0,
}

const sockets = []

export default function initSocket(httpServer) {

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log("A user is connected");

    const { room } = socket.handshake.query
    console.log(`User joined room: ${room}`);

    socket.join(room)

    socket.on("vote_yes", () => {

      if (sockets.includes(socket.id)) {
        return
      }
      voteCounts.yes += 1
      io.to(room).emit("vote_update", voteCounts)

      sockets.push(socket.id)


    })

    socket.on("vote_no", () => {
      if (sockets.includes(socket.id)) {
        return
      }
      voteCounts.no += 1
      io.emit("vote_update", voteCounts)

      sockets.push(socket.id)
    })

    socket.on('disconnect', () => {
      console.log("A user is disconnected.");
    })

  })
}