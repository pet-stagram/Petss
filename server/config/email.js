const nodemailer = require("nodemailer");

const email = {
    "host" : "smtp.mailtrap.io",
    "port": 2525,
    "secure": false, // true for 465, false for other ports
    "auth": {
      "user": "7249b116f938e2", 
      "pass": "65297adab0c2ed",}
}
module.exports=email;


// const smtpTransport = nodemailer.createTransport({//네이버설정
//     service: "Naver",
//     auth: {
//         user: "YourEmail@naver.com",//내이메일?
//         pass: "YourPassword"
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
//   });

  