const { User, Post, Heart, PostImage, Comment, follow } = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const {uploadProfileImage} = require("../module/firebase");

module.exports = {
    /**
     *
     * @param {Number} userId 조회하고자 하는 사용자의 idx
     * @returns 조회값 or 에러
     */
    selectUser: async (userId) => {
        try {
            const findResult = await User.findOne({
                attributes:["id","email","name","nick","image","self_intro"],
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
                        id: userDto.userId,
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
    updateUserImage : async (userDto)=>{
        const imgUrl = await uploadProfileImage(userDto.id,userDto.file);
        try{
            await User.update(
                { image : imgUrl },{ where : { id : userDto.id } }
            );
        }catch(err){
            throw err;
        }
    },
    updateFollow : async (followDto)=>{
       try{
        const findResult = await User.findAll({
            attributes:[
                "Followers.follow.following_id"
            ],
            raw: true,
            // nest:true,
            include : [
                {
                    model: User,
                    as: "Followers",
                    attributes:[],
                    where:{
                        '$Followers.follow.following_id$' : followDto.following,
                        '$Followers.follow.follower_id$' : followDto.follower
                    },
                    // plain:true,
                    // raw:true,
                },
            ]
        });
        if(findResult.length>0){
            /* 현재 세션 사용자가 다른 사용자 화면을 볼때 그 사용자를 팔로우했다면 */
            await User.has(follow)
            .then(exists =>{
                console.log(exists);
            })
        }   
        console.log(findResult);
    }catch(err){
        throw err;
    }
        
    }
    
};
