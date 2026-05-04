const app = require("./src/app");
const connectDB = require("./src/config/db");

let port = 3000

connectDB()
app.listen(port, () => {
  console.log(`Server is running at ${port} port`);
})