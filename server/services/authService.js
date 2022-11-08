const { smtpTransport } = require('../config/email');
const db = require('../sequelize/models')
const { Post, User, Hashtag } = require('../sequelize/models');

/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 
const generateRandom = function (min, max) {
    const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }
  
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
        
     }


        //이메일 & 비밀번호
        // const exUser =  User.findOne({
        //     where:{email}
        // }); // 전송된 email이 이미 가입된 이메일인지 조회
        // if(exUser){
        //     //exUser가 null이 아니라면 (이미 회원 가입이 되어있다면)
        //     return res.redirect("/Login"); //로그인 화면으로 돌아가기
        // }

        // const hash = bcrypt.hash(password, 12);
        // bcrypt로 비밀번호를 암호화한다.
        // 해시연산의 뜻 : 암호화와 비슷한 연산의 결과로 같은 원본 데이터라도 연산 결과가 절대 같은 결과가 나오지 않게 하는 연산.
        // 12 : 해시화를 하기 위한 복잡도 인수. 숫자가 클수록 해시화 암호화가 복잡해지고, 복구 연산도 오래걸린다. 12는 약 1초 정도의 시간이 걸린다.

        // User.create({
        //     // name, nick, pw, pwCheck, phoneNumber, email
        // }); //
        // return res.redirect('/');   // main페이지로 이동
    
    
   
    
}