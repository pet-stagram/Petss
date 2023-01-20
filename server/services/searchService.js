const { Post, User, Hashtag } = require("../sequelize/models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const { raw } = require("express");

module.exports = {
    findSearch : async(userDataHash,userDataNick)=>{   
        try{
            if(userDataHash===""||userDataNick===""){//입력된 값이 없을 때
                return 409;
            }
            if(userDataHash,userDataNick){//입력된 값이 있다면
                //해시태그
                const findHashtag = await Hashtag.findAll( {
                    where : {title: {[Op.like]:"%"+userDataHash+"%"}},
                    attributes:["title"],
                    raw:true,
                } );
                //닉넴
                const findUserNick = await User.findAll({
                    where: {nick: {[Op.like]:"%"+userDataNick+"%"}},
                    attributes:["nick"],
                    raw:true,
                });
                const findHash = findHashtag.map((el)=>el.title); //해시태그
                const findNick = findUserNick.map((el)=>el.nick); //닉넴
                
                if(findHash.length===0){//해쉬가 요룰레이이이이 이고,
                    if(findNick.length===0){//닉도 요룰레이이이이 이면
                        console.log("검색값없음");
                        return [-1,-1];//-1값 반환
                    }else{//닉이 꺼뭉이라면,
                        console.log("닉은있음");
                        return [findNick, findNick];//닉반환
                    }
                }else{
                    console.log(findHash,"해시,닉다있음");
                    return [findHash,findNick];
                }   
            }     
        }catch(err){
            console.error(err);
        }
    },
    
}
