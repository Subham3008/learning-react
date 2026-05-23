const nodemailer = require("nodemailer")


//set up transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "subhamsamanta065@gmail.com",
    pass: process.env.APP_PASSKEY,
  }
})

//send email function
let sendEmails = async (to, subject, text) => {
  let options = {
    from: "subhamsamanta065@gmail.com",
    to,
    subject,
    text,

  }

  await transporter.sendMail(options)
}

module.exports = sendEmails