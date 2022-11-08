const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "YourEmail@naver.com",
        pass: "YourPassword"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }