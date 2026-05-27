const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
})
//for debugging
// console.log("SMTP_USER:", process.env.SMTP_USER);
// console.log("SMTP_PASS exists:", Boolean(process.env.SMTP_PASS));
// console.log("SMTP_PASS length:", process.env.SMTP_PASS?.length);

module.exports = transporter;