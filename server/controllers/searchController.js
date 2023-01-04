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
        const userData = req.body
        const userDataHash = userData.searchWord;
        const userDataNick = userData.nick;
        // console.log(userDataHash,"Controller");//꺼뭉
        // console.log(userDataNick,"Controller");//꺼뭉
        const findUser = await service.findSearch(userDataHash,userDataNick);

        try{
            if(findUser===409){
                res.status(409).send("검색어를 입력해주세요")
            }
            else if(findUser[0]===-1&&findUser[1]===-1){
                //console.log(findUser);
                res.status(400).send("검색결과가 없습니다")      
            }
            else{
                console.log("aa");
                res.status(200).send(findUser);
            }
            // else if([findUser[0]===""]||[findUser[1]===""]){
            //     res.status(400).send("검색결과가 없습니다")
            // }
        }catch(err){
            res.sendStatus(500);
        }
    },
}

//[findUser===""]