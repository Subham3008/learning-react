

const transpoter = require("../config/nodemailer")

const sendmail = async ({ to, subject, html }) => {
  await transpoter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  })
}

module.exports = sendmail