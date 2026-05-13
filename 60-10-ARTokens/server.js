const app = require("./src/app")
const connectDB = require("./src/config/db")

require("dotenv").config()

let port = process.env.PORT || 4000

connectDB()

app.listen(port, () => {
  console.log(`Server is running at ${port}`);

})