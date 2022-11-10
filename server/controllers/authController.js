const { response } = require("express");
const { session } = require("passport");
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
        const userEmail = req.body.email;
        try{
            const sendEmail = await service.sendEmail(userEmail);
            //console.log(sendEmail);
            if(sendEmail==="200"){
                res.sendStatus(200)
            }else{
                res.sendStatus(409)//아디 중복 에러
            }     
        }catch(err){
            res.status(400).send(err);//알수없는에러?(수신이안됬을거임)ㅣ
            // 이미 생성된 유저의 id 리소스와 회원가입하려는 유저의 id가 충돌한 경우라고 볼 수 있기 때문에 409코드를 사용했다.
        }
    },
    
    postEmailCheckNum : (req,res) => {//인증번호 확인하는 부분
        //req.session.checknum = "";
        //res.sendStatus(200) //성공
        //res.status() 에러보내기

        
        //https://typo.tistory.com/entry/Nodejs-JQuery-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9D%B8%EC%A6%9D%EB%B2%88%ED%98%B8-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A0%84%EC%86%A12
    }
   
    
}