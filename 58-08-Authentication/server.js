const app = require("./src/app");
const connectDb = require("./src/config/db");
require("dotenv").config()

connectDb()

app.listen(process.env.port, () => {
  console.log(`Server is starting on port ${process.env.port}`);
})