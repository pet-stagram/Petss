const { Post, User, Hashtag } = require('../sequelize/models');
const email = require('../config/email');
const nodemailer = require("nodemailer");

/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
const generateRandom = function (min, max) {
    const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }
6
module.exports = {
    postFindAll :async ()=>{
        const posts = await Post.findAll({
            order:[[ "id", "DESC" ]],
        });

        return posts;
    },

    insertUser : (user)=>{
        return new Promise((resolve, reject)=>{          
            User.create({email:"min@min.com",nick:user.name,password:user.pw,provider:"",snsid:user.id}).then((result)=>{
                resolve("good")
            }).catch((err)=>{
                reject(err);
            })     
        })
     },

     sendEmail : ()=>{//email로 보낸 숫자와 일치하면 ok 아니면 실패
        const randomNumber = generateRandom(111111,999999);
            
        const send = async(data) =>{//send function data 호출 할때 넣음
            nodemailer.createTransport(email).sendMail(data, function(err, info){
                if(err){
                    console.log(err);
                }else{
                    console.log(info);
                    return info.response;
                }
            })
        }
        const sendmessage = {//랜덤숫자 발송하기 위한 메시지를 담은 변수
            from : "vvvminll@naver.com",
            to : "b08c00d3ca-35b52b@inbox.mailtrap.io",
            subject : "[petss]인증 관련 이메일 입니다.",
            text : "오른쪽 숫자 6자리를 입력해주세요 : "+ randomNumber   
             };
        send(sendmessage);
        //console.log(content); 디버깅확인완료 -> 랜덤숫자 6글자 뜸        
       
       
           
     },
    //  checkEmail : ()=>{
        
    //  }

    
    
   
    
}