const { app, httpServer } = require("./src/app")

httpServer.listen(3000, () => {
  console.log("Server is starting on port 3000");

})