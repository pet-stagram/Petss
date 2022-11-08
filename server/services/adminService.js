const { Post, User, Hashtag } = require('../sequelize/models');

module.exports ={
    selectListAll : async()=>{
        const lists = await User.findAll({
            order:[['id','DESC']],
        });

        return lists;
    }

}
