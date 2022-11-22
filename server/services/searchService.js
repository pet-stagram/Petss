const { Post, User, Hashtag } = require('../sequelize/models');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

module.exports = {
    findHashtag : async (hashtagText) => {

        if(!hashtagText){//입력받은 hashtagText 가 없다면
            //console.log(hashtagText,"hashtagText");
            result = 400;
        }   
        try{
            const hashtag = await Hashtag.findOne( {where : {title: hashtagText} } ); //입력받은 해시태그를 찾는다
            //console.log(hashtag,"hashtag"); 정보뜸
            let posts = [];
            if(hashtag){
                posts = await hashtag.getPosts({ include : [{ model:User}]});
                //console.log(posts,"posts");//빈배열
                result = hashtag;
                }else{
                    result = 400;
                }
                   
            }catch(err){
                throw err;
            }
            return result;
        },

    findUserNick : async (userSearch) => {
        if(!userSearch){
            result = 400;
        }
        try{
            //or검색: 검색하고자 하는 조건을 여러 개 추가하여 이 중 하나라도 만족하면, 그 데이터를 불러오는 operator
            //const userNick = await User.findAll({ where : {nick: {[Op.like]: "%" + userNick + "% "}}});
            const findUserSearch = await User.findAll({where: {[Op.or]:[{nick: { [Op.like]: "%"+userSearch+"%"}}, {name: { [Op.like]: "%"+userSearch+"%"}}]}})
            if(findUserSearch){

            }
        }catch(err){
            throw err;
        }
        
    },

    }
