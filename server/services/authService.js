const { Post, User, Hashtag } = require('../sequelize/models');
const email = require('../config/email');
const nodemailer = require("nodemailer");

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

            if(checkEmailUser){//이메일이 존재한다면,
                //console.log(checkEmailUser);
                return [0, -1];
            }else{//존재하지 않으면 인증번호 발송
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
                }               
            }   
            //sendEmail자체에서 에러나는것(try,catch를 빠져나와 생기는 에러) = status 409에러를 따로 잡아야함
            //인증번호 너무 많이 요청한 경우 409에러뜸. 5회 제한으로 할 수 있게

     },



     checkEmailNum : (checkRanNumber,inputNum)=>{//controller에서 받아온 변수 randomNumber,inputNum
        console.log("랜덤번호 : "+checkRanNumber, "입력한번호 : "+inputNum);
        
        
        //세션의 숫자와 유저가 입력한 숫자가 동일한지 확인한다
        if(checkRanNumber.toString()!==inputNum.toString()){
            console.log("틀림");//400에러
            return 400;
        }
        else{
            console.log("같음");//200status
            return 200;
        }
        
        //세션은 db에 저장되고 db에 저장된 세션과 비교
        //동일하면 return 200, 동일하지 않으면 err를 보낸다 
        //코드번호 5회 오류시 메인화면으로?

        
           
     },
    
    
   
    
}