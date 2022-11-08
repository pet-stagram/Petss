const nodemailer = require("nodemailer");

const email = {
    "host" : "smtp.mailtrap.io",
    "port": 2525,
    "secure": false, // true for 465, false for other ports
    "auth": {
      "user": "7249b116f938e2", 
      "pass": "65297adab0c2ed",}
}

//13.50초

module.exports=email;

// const content = {
//     from : "Petss",
//     to : "b08c00d3ca-35b52b+1@inbox.mailtrap.io",
//     subject : "[petss]인증 관련 이메일 입니다.",
//     text : "오른쪽 숫자 6자리를 입력해주세요 : " + randomNumber             
// }
// send(content);

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

  