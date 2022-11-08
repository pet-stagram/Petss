const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "YourEmail@naver.com",//내이메일?
        pass: "YourPassword"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }