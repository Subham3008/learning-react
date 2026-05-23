const express = require("express")
require("dotenv").config()
const sendEmails = require("./config/mail.service")


const app = express()

app.get("/sendmail", async (req, res) => {
  await sendEmails(
    "subhamsamanta540@gmail.com",
    "You are very consistent person",
    "I know you can did because you are very hardworker........"
  )

  return res.send("Mail chala gya.")
})

module.exports = app