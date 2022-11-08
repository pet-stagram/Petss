const { User, Post, Heart } = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize  = require('sequelize')
async function findFollowUser(userId) {
    /* 현재 user가 follow한 사용자의 id값을 모두 가져옴 */
    const followingsResult = await User.findAll({
        where: {
            id: userId,
        },
        attributes: ["id"],
        include: {
            model: User,
            as: "Followings",
            required: true,
            attributes: ["id"],
        },
        raw: true,
        nest: true,
    });
    const followingsId = [];
    followingsResult.forEach((following) => {
        followingsId.push(following.Followings.id);
    });

    return followingsId;
}

module.exports = {
    selectPostsAll: async (userId) => {
       try{
        const followingsId = await findFollowUser(userId);
        const result = await Post.findAll({
            order: [["updatedAt", "DESC"]],
            where: {
                user_id: {
                    [Op.in]: followingsId,
                },
            },
            attributes:[
                "id",
                "content",
                "img",
                [
                    sequelize.fn
                    (
                      "DATE_FORMAT", 
                      sequelize.col("updated_at"), 
                      "%d-%m-%Y %H:%i:%s"
                    ),
                    "updated_at",
                ]
            ],
            include :[
                {
                model : User,
                attributes :["id","name","nick","image"]
                },
                {
                    model:Heart,
                    // where:{
                        // post_id : this.id
                    // }
                }
            ],
            raw: true,
            nest:true
        });


        return result;
    }catch(err){
        throw new Error(err);
    }
    },
};
