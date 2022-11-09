const { User, Post, Heart } = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class LoadFeed {
    include = [
        {
            model: User,
            attributes: ["id", "name", "nick", "image"],
        },
        {
            model: Heart,
            attributes: [],
        },
    ];

    attributes = [
        "id",
        "content",
        "img",
        [
            sequelize.fn(
                "DATE_FORMAT",
                sequelize.col("updated_at"),
                "%d-%m-%Y %H:%i:%s"
            ),
            "updated_at",
        ],
        [sequelize.fn("COUNT", sequelize.col("hearts.user_id")), "heart_count"],
    ];

    async findFollowUser(userId) {
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
}

module.exports = {
    /**
     * 
     * @param {Number} userId 현재 세션(로그인 된) 유저의 idx 값
     * @returns {Array} [{게시물 id, 내용, 사진, 수정시간, 좋아요 개수, 글쓴이 정보{유저 idx, 이름, 활동명, 프로필사진}}]
     */
    selectPostsAll: async (userId) => {
        const loadFeed = new LoadFeed();
        try {
            const followingsId = await loadFeed.findFollowUser(userId);
            const result = await Post.findAll({
                order: [["updatedAt", "DESC"]],
                where: {
                    user_id: {
                        [Op.in]: followingsId,
                    },
                },
                include: loadFeed.include,
                attributes: loadFeed.attributes,
                group: ["id"],
                raw: true,
                nest: true,
            });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },
    /**
     * 
     * @param {Number} postId 선택한 Post의 idx 값
     * @returns {Object} {게시물 id, 내용, 사진, 수정시간, 좋아요 개수, 글쓴이 정보{유저 idx, 이름, 활동명, 프로필사진}}
     */
    selectPostOne: async (postId) => {
        const loadFeed = new LoadFeed();
        try {
            const result = await Post.findOne({
                where: {
                    id: postId,
                },
                attributes: loadFeed.attributes,
                include: loadFeed.include,
                raw: true,
                nest: true,
            });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },
};
