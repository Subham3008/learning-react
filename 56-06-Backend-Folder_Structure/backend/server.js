const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config()

let port = 3000

connectDB()
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})