const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB()

let port = 3000
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})