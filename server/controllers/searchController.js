const { query } = require("express");
const { Hashtag } = require("../sequelize/models/index.js");
const service = require("../services/searchService.js");


module.exports = {
    //해시태그랑 닉넴검색 result를 하나의 배열이나 객체로 담기
    //결과값을 돌려줘야함 (지금빠져있음)

    // getSearch : async (req,res)=>{참조
    //     const searchData = req.body
    //     const postsOfHashtag = await service.findHashtag(searchData);
    //     const findUser = await service.findUserNick(searchData);
    //     const result = [...postsOfHashtag,...findUser];
    //     res.send(result)
    // },
    getSearch : async(req,res)=>{
        const userDataHash = req.query.Hashtag;
        console.log(userDataHash,"Controller");
        try{//0,-1:409err / 값값 / 1,1:400err/ -1-1:catchErr
            const findHashhData = await service.findSearch(userDataHash);
            //console.log(findHashhData[0],findHashhData[1]);//[] 값 넘어옴
            // if(findHashhData[0]===-1 && findHashhData[1]===-1){
            //     throw "Error sendEmail()";
            // }
            // else if(findHashhData[0]===0 && findHashhData[1]===-1){
            //     res.status(409).send("입력된 데이터가 없습니다.");
            // }
            // else if(findHashhData[0]===findHashhData[1]){
            //     res.status(200).json({findHashhData});
            // }
            // else if(findHashhData[0]===1 && findHashhData[1]===1){
            //     res.status(400).send("검색 결과가 없습니다.")
            // }
        }catch(err){
            res.sendStatus(500);
        }
        

    },

    // getHashtag : async (req,res) => {
    //     const hashtagText = req.query.hashtag; //입력받은 해시태그 hashtagText변수에
    //     //console.log(hashtagText,"hashtagText");//꺼뭉들어옴
    //     try{
    //         postsOfHashtag = await service.findHashtag(hashtagText); //findHashtag로 hashtagText 전달?보냄?
    //         //console.log("postsOfHashtag",postsOfHashtag);
    //         if(postsOfHashtag===400){//해시태그가 없을 경우, 400에러 보내줌
    //             res.sendStatus(400)
    //         }
    //         else{     
    //             res.sendStatus(200)
    //         }
    //     }catch(err){
    //         console.log(err);
    //         res.sendStatus(500);
    //         }
    // },
    

    // /* 닉넴찾기, 유사검색x*/
    // getUserNick : async (req,res) => {
    //     const userNick = req.query;
    //     //console.log(userNick,"userNick, Controller");
    //     try{
    //         const findUser = await service.findUserNick(userNick);
    //         if(findUser===500){  
    //             res.sendStatus(500);
    //         }
    //         else{
    //             if(findUser===400){
    //                 res.sendStatus(400);
    //             }else{
    //                 res.sendStatus(200);
    //             }
    //         }
            
    //     }catch(err){
    //         console.log(err);
    //         res.sendStatus(500);
    //     }
    // },





    // /* 이름검색 유사검색o*/
    // getUserName : async(req,res) => {
    //     const userName = req.query;
    //     //console.log(userName,"userName");
    //     try{
    //         const findUser = await service.findUserName(userName);
    //         //console.log(findUser);
    //         if(findUser===400){
    //             res.sendStatus(400);
    //         }
    //         else{
    //             res.status(200).json(
    //                 findUser
    //             );  
    //         }
    //     }catch(err){
    //         console.log(err);
    //         res.sendStatus(500);
    //     }
        
    // }

}