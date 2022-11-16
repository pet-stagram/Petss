// const passport = require("passport");
// const User = require("../models/user");


// module.exports = () => {//로그인할때 실행?
//     passport.serializeUser((user, done) =>{//매개변수 user로받기
//         done(null, user.email);//done함수에 user.email넘기기
//         //첫번째 함수는 에러발생시 사용, 두번째 함수는 저장하고싶은 데이터
//     })

//     passport.deserializeUser((email, done)=>{//요청시 실행   
//         //passport.session 미들웨어가 deserializeUser메서드 호출
//         //req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
//         //req.user에 저장
//             User.findOne({where: {email }})
//             .then(user => done(null, user))
//              .catch(err => done(err));
         
//     });
//     local();
// }