let http = require("http")

let server = http.createServer((req, res) => {
  res.end("hello")
})

server.listen(3000, () => {
  console.log("Server is running on 3000 port");
})