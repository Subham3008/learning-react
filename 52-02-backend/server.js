let express = require("express")

let app = express()

app.use(express.json())

let port = 3000

let users = [
  {
    name: "subham",
    age: 24
  },
  {
    name: "suvo",
    age: 21
  },
  {
    name: "sanu",
    age: 19
  }
]

app.get("/users", (req, res) => {
  return res.status(200).json({
    message: "from app.get api...",
    users,
  })
})

app.post("/getUser", (req, res) => {
  console.log(req.body);

  return res.status(200).json({
    message: "User fetched succcessfully."
  })
})




app.listen(port, () => {
  console.log(`server is running at port ${port}`);
})