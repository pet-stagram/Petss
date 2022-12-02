const {
    User,
    PostImage,
    Invoice,
} = require("../sequelize/models/index");
const { uploadProfileImage } = require("../module/firebase");
const db = require("../sequelize/models/index");

module.exports = {
    /**
     *
     * @param {Number} userId 조회하고자 하는 사용자의 idx
     * @returns 조회값 or 에러
     */
    selectUser: async (userId) => {
        try{
            const user = await User.findOne({
                where:{id:userId},
                attributes: { exclude: ['password'] }
            });

            const findUserPost = async (user) =>{
                const posts = await user.getPosts({ group: ["id"],nest: true, include:[{model : PostImage, attributes: ["img_url"] , plain: true}]});
                const postsCount = posts.length;
                return {
                    posts,
                    postsCount
                }   
            }

            const getFollowBack = (follower, following) => {
                follower.map((followerUser)=>{
                    following.map((followingUser)=>{
                        const followBack = followerUser.id === followingUser.id ? true : false;
                        followerUser.setDataValue("followBack",followBack);
                    })
                });
                return follower;
            }

            const findUserFollow = async (user) =>{
                const following = await user.getFollowings({raw:true,attributes:["id","name","nick","image"]});
                const followingCount = following.length;
                let follower = await user.getFollowers({attributes:["id","name","nick","image"]});
                const followerCount = follower.length;
                follower = getFollowBack(follower, following);
                return {
                    following,
                    followingCount,
                    follower,
                    followerCount
                }
            }

            const userPosts = await findUserPost(user);
            const userFollow = await findUserFollow(user);

            return {
                info : user.dataValues,
                ...userFollow,
                ...userPosts
            };

        }catch(err){
            console.error(err);
        }
    },
    /**
     *
     * @param {Object} userDto 유저의 정보를 업데이트하기 위한 현재 세션 유저(id), params의 유저id(paramsUserId), 변경할 이름(name), 별명(nick), 비밀번호(password), 자기소개(selfIntro)가 담긴 객체
     */
    updateUserInfo: async (userDto) => {
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
            console.error(err);
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
            console.error(err);
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
        if (followObj.follower_id === followObj.following_id) {
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
                console.error(err);
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
        console.error(err);
    }
    }
};
