import express from "express"
import path from 'path'
import { fileURLToPath } from "url"

const _dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.static(path.join(_dirname, "..", "public")))

console.log(path.join(_dirname, "..", "public"));


app.get("/", (req, res) => {
  res.send("Hello, World!")
})

export default app