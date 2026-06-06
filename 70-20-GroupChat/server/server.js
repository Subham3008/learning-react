const app = require("./src/app")
const initSocket = require("./src/socket/socket.server")
const { createServer } = require("http")

const httpServer = createServer(app)

initSocket(httpServer)

const port = process.env.PORT || 5000

httpServer.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
})