const app = require("./src/app")
require("dotenv").config()

let port = process.env.port || 4000

app.listen("port", () => {
  console.log(`Server is running at ${port}`);

})