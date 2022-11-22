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
    
    getUsernick : (req,res) => {
        const userSearch = req.query.search //입력받은 닉넴 
        console.log(userSearch,"userSearch");

        service.findUserNick(userSearch);
    },

}