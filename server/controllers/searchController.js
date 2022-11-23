const { query } = require("express");
const { Hashtag } = require("../sequelize/models/index.js");
const service = require("../services/searchService.js");

module.exports = {
    getHashtag : async (req,res) => {
        const hashtagText = req.query.hashtag; //입력받은 해시태그 hashtagText변수에
        //console.log(hashtagText,"hashtagText");//꺼뭉들어옴
        try{
            postsOfHashtag = await service.findHashtag(hashtagText); //findHashtag로 hashtagText 전달?보냄?
            console.log("postsOfHashtag",postsOfHashtag);
            if(postsOfHashtag===400){//해시태그가 없을 경우, 400에러 보내줌
                res.sendStatus(400)
            }
            else{     
                res.sendStatus(200)
            }
        }catch(err){
            console.log(err);
            res.sendStatus(500);
            }
    },
    

    /* 닉넴찾기, 유사검색x*/
    getUserNick : async (req,res) => {
        const userNick = req.query;
        //console.log(userNick,"userNick, Controller");
        try{
            const findUser = await service.findUserNick(userNick);
            if(findUser===500){  
                res.sendStatus(500);
            }
            else{
                if(findUser===400){
                    res.sendStatus(400);
                }else{
                    res.sendStatus(200);
                }
            }
            
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    },





    /* 이름검색 유사검색o*/
    getUserName : async(req,res) => {
        const userName = req.query;
        //console.log(userName,"userName");
        try{
            const findUser = await service.findUserName(userName);
            //console.log(findUser);
            if(findUser===400){
                res.sendStatus(400);
            }
            else{
                res.status(200).json(
                    findUser
                );  
            }
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
        
    }

}