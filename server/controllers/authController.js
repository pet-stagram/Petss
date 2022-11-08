const service = require("../services/authService.js");
const { smtpTransport } = require("../config/email");

const db = require("../models")

/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
const generateRandom = function (min, max) {
    const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }

module.exports = {
    getLogin : async(req , res, next)=>{
        try{
            //포스트 검색
            const posts = service.postFindAll();         
            res.status(200).send(posts);        
        }catch(err){
            console.error(err);
            next(err);
        }    
    },
    postRegister : (req,res)=>{
        // const user = {
        //     id  : req.body.id,
        //     name : req.body.name,
        //     pw : req.body.pw
        // }
        const {name, nick, pw, pwCheck, phoneNumber, email } = req.body;
        const user = req.body;
        console.log(user)
        service.insertUser(user).then((result)=>{
            res.status(201).send("ok");
        }).catch((err)=>{
            res.status(400).send(err);
        
        });
        // const { id, name, pw} = req.body.req;
    },

    postEmail : (req, res)=>{
        const randomNumber = generateRandom(111111,999999);
        const {sendEmail} = req.body;
        const mailOptions = {
            from : "Petss",
            to : sendEmail,
            subject : "[petss]인증 관련 이메일 입니다.",
            text : "오른쪽 숫자 6자리를 입력해주세요 : " + randomNumber
        };
    }
    
    
    
}