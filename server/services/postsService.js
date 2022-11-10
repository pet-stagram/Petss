const { User, Post, Heart, PostImage } = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const stream = require("stream");
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../config/petss-b5d7b-firebase-adminsdk-8rolr-eeb3aba037.js");
const fs = require("fs");
const path = require("path");

// firebase Admin 초기화
const admin = firebaseAdmin.initializeApp(
    {
        credential: firebaseAdmin.credential.cert(serviceAccount),
    },
    "storage"
);

const storageRef = admin.storage().bucket(`gs://petss-b5d7b.appspot.com`);

class LoadFeed {
    include = [
        {
            model: User,
            attributes: ["id", "name", "nick", "image"],
        },
        /* Heart.length가 0인 경우 로그인한 유저가 좋아요안함 */
        {
            model: Heart,
            attributes: ["id"],
            where:{
                /* 세션유저 idx값 */
                user_id: 1
            },
            plain:true,
            required : false,
        },
        {
            model:PostImage,
            attributes:["img_url"],    
            plain:true               
        }
    ];
    attributes = [
        "id",
        "content",
        [
            sequelize.fn(
                "DATE_FORMAT",
                sequelize.col("updated_at"),
                "%Y-%m-%d %H:%i:%s"
            ),
            "updated_at",
        ],
        [sequelize.fn("COUNT", sequelize.col("hearts.user_id")), "heart_count"],
        // [sequelize.fn("COUNT", sequelize.col("hearts.user_id")),{where:{user_id:1}},"count"]
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

    async getNewPostNum() {
        try {
            const findResult = await Post.findAll({
                attributes: [[sequelize.fn("MAX", sequelize.col("id")), "max"]],
                raw: true,
            });
            const result = findResult[0].max + 1;
            return result;
        } catch (err) {
            throw new Error(err);
        }
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
        let result;
        try {
            const followingsId = await loadFeed.findFollowUser(userId);
            result = await Post.findAll({
                order: [["updatedAt", "DESC"]],
                where: {
                    user_id: {
                        [Op.in]: followingsId,
                    },
                },
                include: loadFeed.include,
                attributes: loadFeed.attributes,
                /* group으로 묶어주니 1:N이 모두 출력됨 */
                group: ["id","postImages.id"]   ,
                nest:true,
                // raw:true
                // required:false, 
            });
            
        } catch (err) {
            result = err;
        }
        return result;
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
                group: ["postImages.id"]   
                
                
            });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    },

    insertPosts: async (info) => {
        let postId;
        let result;
        await Post.create({
            content: info.content,
            user_id: 1,
            created_at: Date.now(),
            updated_at: Date.now(),
            })
            .then(async (postCreateResult) => {
                postId = postCreateResult.get({ plain: true }).id;
                const promise = info.fileUrl.map(async (url) => {
                    await PostImage.create({
                        postId: postId,
                        imgUrl: url,
                    });
                });
                try{await Promise.all(promise); result = "success";}
                catch(err){
                    result = err;
                };
            })
            .catch((err) => {
                result = err;
            });
        return result;
    },
    /**
     *
     * @param {Arary} files 클라이언트에서 선택하여 제출한 파일(이미지 혹은 동영상) 배열
     * @returns
     */
    uploadFile: async (files) => {
        const loadFeed = new LoadFeed();
        /* 새로운 피드 번호 가져와야함 */
        const newPostNum = loadFeed.getNewPostNum();
        const urlArr = [];
        let storage;
        const promises = files.map(async (file) => {
            storage = await storageRef.upload(file.path, {
                public: true,
                destination: `/uploads/feed/${newPostNum}/${file.filename}`,
                metadata: {
                    firebaseStorageDownloadTokens: uuidv4(),
                },
            });
            urlArr.push(storage[0].metadata.mediaLink);
            fs.rmSync(file.path, { recursive: true, force: true });
        });
        await Promise.all(promises);
        return urlArr;
    },
    updateHeart : async (likeDto)=>{

        const dtoObject ={
            user_id:likeDto.user,
            post_id:likeDto.postId
        }

        const findAlreadyLike = await Heart.findAll({
            where:dtoObject,
            raw:true
        });
        if(findAlreadyLike.length===0){
            try{
            await Heart.create(dtoObject);
            return "created";
            }
            catch(err){
                return err;
            }
        }else{
            try{
                await Heart.destroy({
                    where:dtoObject
                });
                return "destroy";
            }catch(err){
                return err;
            }
        }
        
    }
};
