const service = require("../services/authService.js");




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
     service.sendEmail();
     
    }
    
    
    
}