const { Post, User, Hashtag } = require('../sequelize/models');
const email = require('../config/email');
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


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

    /* 회원가입 */
    insertUser : async (user,inputPw)=>{       
            
        const {name, nick, password, phone, email, regDate, inputPassword} = user;

        //console.log(user.nick);

        //동일한 닉네임 있는지 확인
        try {
            const chekNick = await User.findOne({ where: { nick } })//user.nick:nick
            //console.log(chekNick);동일한 닉넴이 있는지 없는지 확인함
            if (chekNick) {
                console.log("닉넴없음");
                result = 400;

            } else {
                console.log("닉넴없음");
                result = 200;
            }

            //비번과 입력한 비번이 맞는지 확인
            const inputPass = inputPw;//클라이언트에서 입력한 비밀번호 가져옴 9 //지금은 임시로inputPw을 썼지만 inputPassword로 바꿔야됨
            const hashPass = password//db에 저장된 비밀번호
            const hashPw = bcrypt.hashSync(hashPass, 12);//해쉬암호화된 비번 //$2b$12$nRLEWckXHJarOAj6S80DMuZT1J86bOfIZQd10VsE9xvg8lgSsvsaW

            const matchPw = await bcrypt.compare(inputPass, hashPw);
            if (matchPw) {
                console.log("비번맞음");
                result = 200;
            } else {
                console.log("비번틀림");
                result = 400;
            }

            const addUser = await User.create({//try문 따로써야하나? 따로써보자
                name: user.name,
                nick: user.nick,
                password: hashPw,
                phone: user.phone,
                email: user.email,
                regDate: user.regDate,
            });

        } catch (err) {
            console.log(err);
            return err;
        }


       
           
       
        
        return result;
        
          //---------------- 
        // return new Promise((resolve, reject)=>{          
        //     User.create({email:"min@min.com",nick:user.name,password:user.pw,provider:"",snsid:user.id}).then((result)=>{
        //         resolve("good")
        //     }).catch((err)=>{
        //         reject(err);
        //     })     
        // })

         
        
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
           
            //인증번호 너무 많이 요청한 경우 429에러뜸. 5회 제한으로 할 수 있게
            

     },

     /* 인증번호 비교 */
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
    
    
   
    
