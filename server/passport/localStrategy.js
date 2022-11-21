const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../sequelize/models");

// const userData = {
//     email: "1",
//     password: "1",
//     nickname: "1"
// }

module.exports = () => {
    passport.use(new LocalStrategy({//form양식에 설정한 name으로 바꾸면 됨.   
        usernameField: "email",
        passwordField: "password",
    }, 
    
    // async( username, password, done) => {    
    //     try{
    //         console.log("LocalStrategy",email,password);//출력이 안됨.. 왜지?
            
    //         //const userData = await User.findOne({where:{email}});
    //         //console.log(userData,"userData");
    //         if(userData){//user이메일이 맞으면,
    //             console.log("1");
    //             const userPw = await bcrypt.compare(password, userData.password);
    //             if(userPw){//user비번이 맞으면,
    //                 console.log("2");
    //                 return done(null,userData);//user정보 return
    //             }else{
    //                 console.log("3");
    //                 return done(null,false,{
    //                     message:"잘못된 비번"
    //                     })
    //             }
    //         }else{
    //             console.log("4");
    //             return done(null,false,{
    //                 message:"잘못된 이메일"
    //             })
    //         }
    //     }catch(err){
    //         console.log(err);
    //         return err;
    //     }
        
    // }

    
    function ( username, password, done){
        console.log("LocalStrategy", username, password);//콘솔안나옴ㅜㅜ 
        console.log(err);//콘솔안나옴ㅜㅜ
        //username:사용자가 입력한 값
        //authData:실제 입력했어야 하는 값(저장된db)
        if(username===userData.email){
            console.log(1);
            if(password===userData.password){//이멜,비번 맞다면
                console.log(2);
                return done(null,userData);//성공한사용자정보를 알려주는거임
            }else{//비번 다르다면
                console.log(3);
                return done(null,false,{
                    message:"잘못된비번"
                    });
                }
        }else{//이메일이 다르다면 done함수 호출하면서 false,실패한 이유 
            console.log(4);
            return done(null,false,{
                message:"잘못된이메일"
                });
            }
        }
    
    
    ))
}