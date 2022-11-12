const { Post, User, Hashtag } = require('../sequelize/models');
const email = require('../config/email');
const nodemailer = require("nodemailer");
const { response } = require('express');
const { session } = require('passport');

/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
const generateRandom = function (min, max) {
    const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }
const randomNumber = generateRandom(111111,999999);//랜덤번호 받은 변수

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

     sendEmail : async(userEmail)=>{//email주소로 인증번호 발송, 이미 존재하는 이메일이면 이메일 안보냄
        // return 값
        // 0, -1: 이메일 중복 시
        // randomnumber, randomnumber: 정상
        // -1, -1: error 시(catch)
            const checkEmailUser = await User.findOne({where: {email : userEmail }});

            if(checkEmailUser){//이미 있는 이메일이라면 exist문자열을 return함
                //console.log(checkEmailUser);
                return [0, -1];
            }else{//인증번호 발송
                //try. catch해서 성공하면 바로 return 200, 실패하면 return err, controller에서 400에러 찍고 send 에러보냄으로
                try{
                    // throw 'test';
                    const send = async(data) =>{//send function data 호출 할때 넣음
                    nodemailer.createTransport(email).sendMail(data, function(err, info){//data=from,to,messageid
                        if(err){
                            console.log(err);
                        }else{
                            console.log(info);
                            return info.response;
                        }
                    })
                    }
                    const sendmessage = {//랜덤숫자 발송하기 위한 메세지를 담은 변수
                        from : "vvvminll@naver.com",
                        to : "b08c00d3ca-35b52b@inbox.mailtrap.io",
                        subject : "[petss]인증 관련 이메일 입니다.",
                        text : "오른쪽 숫자 6자리를 입력해주세요 : "+ randomNumber   
                        };
                    send(sendmessage); //메세지 담은 sendmessage를 메일보냄 
                    
                    return [randomNumber, randomNumber];
                }catch(err){
                    return [-1, -1];
                }//try,catch문에 빠져나와서 생긴 에러 처리하는게 좋겠다   
            }           
     },













     checkEmailNum : (checknum)=>{
        //sendEmail에서 보낸 랜덤숫자를 세션에 담는다.
        //세션의 숫자와 유저가 입력한 숫자가 동일한지 확인한다
        //세션은 db에 저장되고 db에 저장된 세션과 비교
        //동일하면 return 200, 동일하지 않으면 err를 보낸다 
        

        
           
     },
    
    
   
    
}