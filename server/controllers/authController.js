const { response } = require("express");
const service = require("../services/authService.js");




//controller에서는 req, res관련 작업만 하기!!! 다른거는 다 service에서 하면됨!! 기억하셈!!!


module.exports = {
    getLogin : async(req , res)=>{
        try{
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
    

    postEmail : async(req, res)=>{
        try{
            const sendEmail = service.sendEmail();
            res.status(200).send(sendEmail, "인증번호를 보냈습니다.");
        }catch(err){
            res.status(500).send("인증번호를 보내는데 실패했습니다.");
        }
    },
    
    postEmailCheck : (req,res) => {
        const emailCheck = req.body.email;
        //https://typo.tistory.com/entry/Nodejs-JQuery-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9D%B8%EC%A6%9D%EB%B2%88%ED%98%B8-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A12
    }
    // postEmailDuplicate : ()=>{
    //     service.checkEmail();
    // }
    
}