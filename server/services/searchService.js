const { Post, User, Hashtag } = require("../sequelize/models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const { raw } = require("express");

module.exports = {
    findSearch : async(userData)=>{
        //console.log(userData,"userData");
        const userHashtag = userData.hashtag;
        const usernNick = userData.nick;
        //console.log(userHashtag,"userHashtag");//값없음 맞음
        //console.log(usernNick,"usernNick");
        try{
            // return 값
                // 0, -1: 입력된 데이터가 없을 때
                // 값, 값: 정상
                // 1, 1: 입력된 값이 없을 때
                // -1, -1: error 시(catch)
            if(!userData){//입력된 데이터가 없으면 409로, 
                return [0,-1]; //충돌
            }
            else{
                //입력된 데이터가 있으면,
                //해시태그 검색
                const hashtag = await Hashtag.findOne( {where : {title: userHashtag} } );
                let posts = [];
                if(hashtag){
                    posts = await hashtag.getPosts({ include : [{ model:User}]});

                    //유저닉넴 검색
                    const usernickname = await User.findAll({
                    where: {nick: {[Op.like]:"%"+usernNick+"%"}},
                    attributes:["nick"],
                    raw:true,
                    });
                    const nickData = usernickname.map((el)=>el.nick);
                    //console.log(nickData,"nickData");
                    if(nickData===""||nickData.length===0||nickData===null){
                    //console.log([1,1]);
                        return [1,1];
                    }else{
                    // console.log([nickData,nickData]);
                    return [hashtag,nickData];
                    }
                //    return [hashtag,hashtag];
                    }else{
                        return [1,1];
                    }
                // //유저닉넴 검색
                // const usernickname = await User.findAll({
                //     where: {nick: {[Op.like]:"%"+usernNick+"%"}},
                //     attributes:["nick"],
                //     raw:true,
                // });
                // const nickData = usernickname.map((el)=>el.nick);
                // //console.log(nickData,"nickData");
                // if(nickData===""||nickData.length===0||nickData===null){
                //     //console.log([1,1]);
                //     return [1,1];
                // }else{
                //     // console.log([nickData,nickData]);
                //     return [nickData,nickData];
                // }
            }
        }
        catch(err){
            return[-1,-1];
        }
        
        


    },
    /* 해시태그 */
    // findHashtag : async (hashtagText) => {
    //     if(!hashtagText){//입력받은 hashtagText 가 없다면
    //         //console.log(hashtagText,"hashtagText");
    //         result = 400;
    //     }   
    //     try{
    //         const hashtag = await Hashtag.findOne( {where : {title: hashtagText} } ); //입력받은 해시태그를 찾는다
    //         //-console.log(hashtag,"hashtag"); 정보뜸
    //         let posts = [];
    //         if(hashtag){
    //             posts = await hashtag.getPosts({ include : [{ model:User}]});
    //             //console.log(posts,"posts");//빈배열
    //             result = hashtag;
    //             }else{
    //                 result = 400;
    //             }
                   
    //         }catch(err){
    //             throw err;
    //         }
    //         return result;
    //     },

    // /* 닉넴찾기, 유사검색x*/
    // findUserNick : async (userNick) => {
    //     const userNickName = userNick.nick;//{userNick}으로 되어있는걸  .nick을 붙여서 userNick으로 바꿔줌=>userNickName쓰면됨
    //     console.log(userNickName);
    //     try{
    //         if(userNickName.length===0||userNickName===null){
    //             result = 500;
    //         } 
    //         else{
    //             const findUser = await User.findOne({
    //                 where:
    //                     {nick : userNickName}, 
    //                     attributes: ["nick"], 
    //                     raw:true  
    //                     });
    //             console.log(findUser.nick,"findUser.nick");
    //             if(findUser.nick!==userNickName){
    //                 result = 400;
    //             }
    //             else{
    //                 result = 200;
    //             }
    //         }
    //             return result;
    //         }
    //         catch(err){
    //             throw err;
    //     }      
    // },

    // /* 이름검색 유사검색o*/
    // findUserName : async (userName) => {
    //     const userRegName = userName.name;
    //     //console.log(userRegName,"userRegName");
    //     try{    
    //         if(!userRegName){
    //             result = 400;
    //         }else{
    //             const findUser = await User.findAll({
    //                 //where:{name:userRegName},
    //                 where: { name: { [Op.like]: '%' + userRegName + '%' } },
    //                 attributes:["name"],
    //                 raw:true
    //             });
    //             const nameData = findUser.map((el) => el.name);
    //             console.log(nameData);

    //             if(nameData.length===0){
    //                 result = 400;
    //             }else{
    //                 result = nameData;
    //             }
    //         }
            
    //         return result;
    //     }catch(err){
    //         throw err;
    //     } 
    // },

}
