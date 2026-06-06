const app = require("./src/app")
const connectDB = require("./src/config/db")
const initSocket = require("./src/socket/socket.server")
const { createServer } = require("http")

const httpServer = createServer(app)

initSocket(httpServer)

const port = process.env.PORT || 5000

connectDB()

httpServer.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
})