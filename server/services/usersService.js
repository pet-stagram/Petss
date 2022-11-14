const {
    User,
    Post,
    Heart,
    PostImage,
    Comment,
} = require("../sequelize/models/index");
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
    uploadFile:()=>{
        
        return urlArr;
    },
    updateUserImage : async (userDto)=>{
        const imgUrl = await uploadProfileImage(userDto.id,userDto.file);
        try{
            await User.update(
                {image : imgUrl},{where : { id : userDto.id }}
            );
        }catch(err){
            throw err;
        }
    },
    uploadFile : (file) =>{
        
       
    }
};
