const {
    User,
    Post,
    Heart,
    PostImage,
    Comment,
    Follow,
    Invoice,
} = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { uploadProfileImage } = require("../module/firebase");
const db = require("../sequelize/models/index");
const usersController = require("../controllers/usersController");

module.exports = {
    /**
     * 
     * @param {Number} currentUser 현재 세션의 id값
     * @returns {Object} 세션 유저 정보(info), 팔로잉 중인 유저 목록(following), 팔로워 중인 유저 목록(follower), 팔로잉 수(followingCount), 팔로워 수(followerCount)
     */
    selectMyInfo : async (currentUser)=>{
        try{
            const user = await User.findOne({where:{id:currentUser}});

            const following = await user.getFollowings({raw:true,attributes:["id","name","nick","image"]});
            const followingCount = following.length;
            const follower = await user.getFollowers({raw:true,attributes:["id","name","nick","image"]});
            const followerCount = follower.length;
            
            const currentUserData = 
            {
                info : user.dataValues,
                following,
                followingCount,
                follower,
                followerCount
            }
            return currentUserData;
        }catch(err){
            throw err;
        }
    },
    /**
     *
     * @param {Number} userId 조회하고자 하는 사용자의 idx
     * @returns 조회값 or 에러
     */
    selectUser: async (userId) => {
        try {
            const findResult = await User.findOne({
                attributes: [
                    "id",
                    "email",
                    "name",
                    "nick",
                    "image",
                    "self_intro",
                ],
                where: {
                    id: userId,
                },
                raw: true,
            });
            return findResult;
        } catch (err) {
            throw err;
        }
    },
    /**
     *
     * @param {Number} userId 피드를 조회할 사용자의 idx
     * @returns 조회된 Post 결과 or 에러
     */
    selectUserPosts: async (userId) => {
        try {
            const findResult = await Post.findAll({
                where: {
                    user_id: userId,
                },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: PostImage,
                        attributes: ["img_url"],
                        plain: true,
                    },
                ],
            });
            return findResult;
        } catch (err) {
            throw err;
        }
    },
    /**
     *
     * @param {Object} userDto 유저의 정보를 업데이트하기 위한 현재 세션 유저(id), params의 유저id(paramsUserId), 변경할 이름(name), 별명(nick), 비밀번호(password), 자기소개(selfIntro)가 담긴 객체
     */
    updateUser: async (userDto) => {
        try {
            await User.update(
                {
                    name: userDto.name,
                    nick: userDto.nick,
                    password: userDto.password,
                    self_intro: userDto.selfIntro,
                },
                {
                    where: {
                        id: userDto.id,
                    },
                }
            );
        } catch (err) {
            throw err;
        }
    },
    /**
     *
     * @param {Object} userDto 유저의 사진을 수정하기위한 현재 세션 유저(id), 변경할 유저의 idx(paramsUserId), 변경할 사진(file)
     */
    updateUserImage: async (userDto) => {
        const imgUrl = await uploadProfileImage(userDto);
        try {
            await User.update({ image: imgUrl }, { where: { id: userDto.id } });
        } catch (err) {
            throw err;
        }
    },
    /**
     *
     * @param {Object} followDto 팔로잉을 위한 현재 세션 유저의 id값(currentUser)과 팔로잉 상대 유저의 id값(profileUser)이 담긴 객체
     * @returns 로직 결과
     */
    updateFollow: async (followDto) => {
        const Follow = db.sequelize.models.follow;
        const followObj = {
            following_id: followDto.profileUser,
            follower_id: followDto.currentUser,
        };
        // console.log(followObj.follower_id);
        // console.log(typeof followObj.following_id);
        if (followObj.follower_id === followObj.following_id) {
            /* 본인 스스로를 팔로우하는 경우 HTTP 400 리턴 */
            return "Bad Request";
        } else {
            try {
                const followable = await Follow.findAll({
                    where: followObj,
                    raw: true,
                });
                if (followable.length > 0) {
                    /* 팔로잉 중인 경우 팔로우 취소*/
                    await Follow.destroy({
                        where: followObj,
                    });
                    return "Destroy";
                } else {
                    const currentUser = await User.findOne({
                        where: {
                            id: followDto.currentUser,
                        },
                    });
                    const profileUser = await User.findOne({
                        where: {
                            id: followDto.profileUser,
                        },
                    });
                    await currentUser.addFollowings(profileUser);
                    await profileUser.addFollowers(currentUser);
                    return "Created";
                }
            } catch (err) {
                throw err;
            }
        }
    },
    /**
     * 
     * @param {Object} invoiceDto 문의사항 작성을 위한 문의사항 제목(title), 내용(content), 세션 유저아이디(userId)가 담긴 객체
     */
    insertInvoice : async (invoiceDto)=>{
        try{
        await Invoice.create({ 
            title: invoiceDto.title,
            content: invoiceDto.content,
            createdAt : Date.now(),
            updatedAt : Date.now(),
            user_id: invoiceDto.userId
        });
    }catch(err){
        throw err;
    }
    }
};
