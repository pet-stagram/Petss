
const { Cookie } = require("express-session");
const { session } = require("passport");
const passport = require("../passport/index.js");
const service = require("../services/authService.js");
const LocalStrategy = require("../passport/localStrategy");


//controller에서는 req, res관련 작업만 하기!!! 다른거는 다 service에서 하면됨!! 기억하셈!!!
const inputNum = "692438"; //입력한 숫자 대신 임시적으로 사용할 변수
//731453

const inputPw = "12"; //입력한 비번 대신 임시적으로 사용할 변수

const userData = {
    email: "10",
    password: "10",
    nickname: "1"
}


//HTTP 상태코드 보낼 때 send()나 status()보다 sendStatus() 함수만 사용하는 것이 좋아보입니다.
//따로 보낼 정보가 있을 경우는 res.json()을 사용하여 json 파일 보내주면 좋을 것 같아요

module.exports = {
    /* 로그인 */
    //next(); //다음 미들웨어 실행
    postLogin : async (req , res, next)=>{//isNotLoggendIn
        //const exUser = req.body; //form에서 입력받은 정보 exUser에 담기
        const userEmail = userData.email;//원래는exUser 써야하는데 입력받은게 없으니까 임시적으로 userData변수를 적음
        const userPassword = userData.password;
        try{    
            const loggginUser= await service.loginUser(userEmail,userPassword); //db담은 exUser변수 loginUser로 전달
            if(loggginUser==="200"){
                req.session.isLogined = true;
                req.session.nickname = userData.nickname;
                console.log("성공");
                res.sendStatus(200);      
            }
            //400 - bad_request - request 실패 ex) 유효성 검사 통과 실패, 잘못된 요청
            //401 - unauthorized - 인증 실패 ex) 세션 없음, 로그인 실패
            else if(loggginUser==="400"){
                console.log("비번틀림");
                res.sendStatus(400);
            }
            else{
                console.log("이멜틀림");
                res.sendStatus(401);
            }   
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    },

   /* 로그아웃 */
   getLogout : (req, res)=>{//isLoggedIn   
    //401에러 로그인하지 않은 상태에서 자신의 사용자 정보 요청/ 로그인하지 않은 상태에서 글 작성
    //403에러 로그인했지만 다른 유저의 비밀번호를 변경하는 API 요청한 경우/  로그인했지만 관리자용 API를 요청한 경우
            req.session.destroy(function(err){
                res.sendStatus(200);
            })
9   },

    /* 회원가입 눌렀을 때 */
    //https://victorydntmd.tistory.com/33
    postRegister : async (req,res)=>{  
        const {name, nick, password, phone, email, regDate, inputPassword } = req.body;
        const user = {name, nick, password, phone, email, regDate, inputPassword };  
      
        //inputPassword 비밀번호 확인 하기 위해 만든 변수
        // 비밀번호
        const insertUserInfo = await service.insertUser(user,inputPw);       
      
        try {
            if (insertUserInfo === 400) {
                console.log("실패");
                res.sendStatus(400);
            }
            else if (insertUserInfo === 200) {
                console.log("성공");
                res.sendStatus(201);
            }
            else
            {
                throw 'Failed Registering New User!';
            }
          
        }catch(err){
            console.log(err);
            res.sendStatus(400);
        }
        //---
        // service.insertUser(user).then((result)=>{
        //     res.sendStatus(201)
        // }).catch((err)=>{
        //     res8.sendStatus(400)
        // });     
    },
    
    /* 이메일 인증 */
    postEmail : async(req, res)=>{
        const userEmail = req.body.email;
        try{
            const sendEmailNum = await service.sendEmail(userEmail);
            console.log("randomNumber: " + sendEmailNum[0] + ", " + sendEmailNum[1]); //랜덤번호 확인용
            if (sendEmailNum[0] === -1 && sendEmailNum[1] === -1){
                throw "Error sendEmail()";
            }         
            else if(sendEmailNum[0]===sendEmailNum[1]){
                if(req.session.randomNumber===undefined){//req.session.randomNumber이 undefined 상태이면 sendEmailNum[0] 저장
                    req.session.randomNumber = sendEmailNum[0];
                    req.session.count=0;   
                }else{
                    req.session.randomNumber = sendEmailNum[0]; // req.session.randomNumber에 새로운 sendEmailNum[0] 저장
                    req.session.count=0;
                }
                //console.log("랜덤번호 : " + req.session.randomNumber);
                res.sendStatus(200).send(req.session.randomNumber);//랜덤번호 보내기
            } 
            else{
                res.sendstatus(409);//이메일 중복 에러
                // 이미 생성된 유저의 id 리소스와 회원가입하려는 유저의 id가 충돌한 경우라고 볼 수 있기 때문에 409코드를 사용했다.
            }            
        }catch(err){
            res.status(400).send(err);//알수없는에러
        }
        
       
    },
    
    /* 랜덤번호와 입력한 랜덤번호 맞는지 확인 */
    postEmailCheckNum : async (req,res) => {//인증번호 확인하는 부분
        //const inputNum = req.body.inputNum; //사용자가 입력한 숫자를 변수에 담음 //아직 입력한 숫자가 없기때문에 주석처리함
        //console.log(inputNum);
        const emailCheckDto = {
            checkRandomNumber : req.session.randomNumber,
            inputNum:inputNum,
            count:req.session.count
        }
        const checkRandomNumber = req.session.randomNumber; //세션에 저장한 랜덤숫자 checkRanNumber 변수로 저장
        
            if(req.session.count<6){
                const checkNumber = await service.checkEmailNum(emailCheckDto); // checkEmailNum로 checkRanNumber,inputNum,req.session.count 변수 보냄
                req.session.count++;
            //checkEmailNum 자체 에러 500번으로 잡고,
            //5번하면 400에러
            //성공하면 200번
            //인증번호틀리면 다시시도
            //console.log(checkNumber);

            if(checkNumber===200){
            req.session.destroy(Cookie[0]);
            res.sendStatus(200);
          
            }
            else {
             if(checkNumber===400){
                req.session.destroy(Cookie[0]);
                res.sendStatus(400);//5번틀렸을때
                
             }
            else if(checkNumber===409){
                res.sendStatus(409)//인증번호 틀렸을때
            }
            else {
                req.session.destroy(Cookie[0]);
                res.sendStatus(500)
            }
            }                       
        }
        else{
            res.sendStatus(400);
        } 
    },
   
}

