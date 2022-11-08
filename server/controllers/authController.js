const service = require("../services/authService.js");
const { smtpTransport } = require("../config/email");

const db = require("../models")

//controller에서는 req, res관련 작업만 하기!!! 다른거는 다 service에서 하면됨!! 기억하셈!!!


module.exports = {
    getLogin : async(req , res)=>{
        try{
            //포스트 검색
            const posts = service.postFindAll();         
            res.status(200).send(posts);        
        }catch(err){
            console.error(err);
            
        }    
    },
    postRegister : (req,res)=>{
        const {name, nick, pw, pwCheck, phoneNumber, email } = req.body;
        const user = req.body;
        console.log(user)
        service.insertUser(user).then((result)=>{
            res.status(201).send("회원가입에 성공하였습니다.");
        }).catch((err)=>{
            res.status(400).send(err);
        
        });
       
    },

    postEmail : (req, res)=>{
        const {sendEmail} = req.body;  
        const result =  smtpTransport.sendMail(mailOptions, (err, responses) => {
            if (err) {
                return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL))
            } else {
              /* 클라이언트에게 인증 번호를 보내서 사용자가 맞게 입력하는지 확인! */
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
                    number: number
                }))
            }
            smtpTransport.close();
        });
       
    }
    
    
    
}