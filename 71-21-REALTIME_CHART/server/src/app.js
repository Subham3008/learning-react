import express from "express"
import { createServer } from "http"
import { initSocket } from "./socket/socket.server.js"


const app = express()
const httpServer = createServer(app)  //express ke sath http ko jorna

initSocket(httpServer)  //socket ke sath express ko jorna


export { httpServer }
