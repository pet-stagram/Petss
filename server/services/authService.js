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

     /* 이메일 인증 */
     sendEmail : async(userEmail)=>{//email주소로 인증번호 발송, 이미 존재하는 이메일이면 이메일 안보냄
        // return 값
        // 0, -1: 이메일 중복 시
        // randomnumber, randomnumber: 정상
        // -1, -1: error 시(catch)
            const checkEmailUser = await User.findOne({where: {email : userEmail }});

            if(checkEmailUser){//이메일이 존재한다면,
                //console.log(checkEmailUser);
                return [0, -1];
            }else if(!checkEmailUser){//존재하지 않으면 인증번호 발송
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
            // else if(a){

            // }   
            //인증번호 너무 많이 요청한 경우 429에러뜸. 5회 제한으로 할 수 있게
            

     },


     checkEmailNum : async (emailCheckDto)=>{//controller에서 받아온 변수 randomNumber,inputNum
        //console.log("랜덤번호 : "+checkRandomNumber, "입력한번호 : "+inputNum);
        const {checkRandomNumber, inputNum, count } = emailCheckDto;
        
        //세션의 숫자와 유저가 입력한 숫자가 동일한지 확인한다
        //count  +1 해서 합이 5번 되면 안되게 하는것처럼 //for문으로 돌리지말고
           
        let result;
        if(checkRandomNumber.toString()===inputNum.toString()){
                console.log("인증번호맞음")
                result = 200;
            }
            else{             
                if(count===5){
                    console.log("5번 틀렸음");
                    result = 400;
                }else if(checkRandomNumber.toString()!==inputNum.toString()){
                    console.log("인증번호 다시확인하삼");
                    result = 409;  
                }
            }
            //console.log(result);
            return result;                             
        },
    
     }
    
    
   
    
