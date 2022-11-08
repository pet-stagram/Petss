const db = require('../models')
const { Post, User, Hashtag } = require('../models');

module.exports ={
    selectListAll : async()=>{
        const lists = await User.findAll({
            order:[['id','DESC']],
        });

        return lists;
    }

}
