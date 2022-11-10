const nodemailer = require("nodemailer");
require ("dotenv").config();

const env = process.env;
const email = {
    "host" : env.EMAIL_HOST,
    "port": env.EMAIL_PORT,
    "secure": false, // true for 465, false for other ports
    "auth": {
      "user": env.AUTH_USER, 
      "pass": env.AUTH_PASS,}
}


module.exports=email;




  