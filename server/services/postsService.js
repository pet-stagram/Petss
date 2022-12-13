const {
    User,
    Post,
    Heart,
    PostImage,
    Comment,
    Hashtag,
} = require("../sequelize/models/index");
const db = require("../sequelize/models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { uploadPostsImages } = require("../module/firebase");


class LoadFeed {
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
            console.error(err);
        }
    }
}

module.exports = {
    /**
     *
     * @param {Number} userId 현재 세션(로그인 된) 유저의 idx 값
     * @returns {Array} [{게시물 id, 내용, 사진, 수정시간, 좋아요 개수, 글쓴이 정보{유저 idx, 이름, 활동명, 프로필사진}}]
     */
    selectPostsAll: async (currentUser) => {
        const loadFeed = new LoadFeed();
        let result;
        try {
            const followingsId = await loadFeed.findFollowUser(currentUser);
            result = await Post.findAll({
                order: [["updatedAt", "DESC"]],
                where: {
                    user_id: {
                        [Op.or] :{
                            [Op.in]: followingsId,
                            [Op.eq]: currentUser // 세션으로 변경하기
                        }
                    }
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "nick", "image"],
                    },
                    {
                        model: Heart,
                        attributes: ["id","user_id"],
                        plain: true,
                        required: false,
                    },
                    {
                        model: PostImage,
                        attributes: ["img_url"],
                        plain: true
                    },
                ],
                attributes: [
                    "id",
                    "content",
                    [
                        sequelize.fn(
                            "DATE_FORMAT",
                            sequelize.col("updated_at"),
                            "%Y-%m-%d %H:%i:%s"
                        ),
                        "updated_at",
                    ]
                ],
                /* group으로 묶어주니 1:N이 모두 출력됨 */
                group: ["id", "Hearts.id","PostImages.id"],
                nest: true
            });


            const addMyHeartInPosts = async (result) => {
                await Promise.all(result.map(async (post)=>{
                    const heartCount = await Heart.findAndCountAll({
                        where:{
                            post_id : post.id,
                            user_id : currentUser
                        },
                        attributes:["id"],
                        raw:true
                    });
                    if(heartCount.count>0){
                        post.setDataValue('myHeart',true);
                        
                    }else{
                        post.setDataValue('myHeart',false);
                    }
                }));
                return result;
            };

            result = await addMyHeartInPosts(result);

            return result;
        } catch (err) {
            console.error(err);
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
                // group: ["postImages.id"],
                nest: true,
            });
            
            return result;
        } catch (err) {
            console.error(err);
        }
    },

    /**
     *
     * @param {Object} postDto 피드를 게시하기 위한 현재 세션유저, 피드 내용, 사진 및 파일이 담긴 객체
     * @returns "success" 혹은 err
     */
    insertPosts: async (postDto) => {
        let postId;
        let result;

        /* 피드의 내용에서 #을 포함한 문자열 찾아서 새로운 배열로 생성 */
        const hashtags = postDto.content.match(/#[^\s#]*/g);
        const hashtagContents = [];

        try {
            const postCreateResult = await Post.create({
                content: postDto.content,
                user_id: postDto.user,
                created_at: Date.now(),
                updated_at: Date.now(),
            });
            postId = postCreateResult.get({ plain: true }).id;
            const promise = postDto.fileUrl.map(async (url) => {
                await PostImage.create({
                    postId: postId,
                    imgUrl: url,
                });
            });

            if (hashtags !== null) {
                hashtags.forEach((hashtag) => {
                    /* 추출한 해시태그 #을 제거하고 내용만 넣기 */
                    hashtagContents.push(hashtag.replace(/#/g, ""));
                });
                const PostHashtag = db.sequelize.models.post_has_hashtag;

                hashtagContents.forEach(async (hashtagContent) => {
                    let existHashtag = await Hashtag.findOne({
                        where:{title: hashtagContent}
                    });

                    if (!existHashtag) {
                        existHashtag = await Hashtag.create({
                            title: hashtagContent,
                        });
                    }
                    await PostHashtag.create({
                        post_id: postId,
                        hashtag_id: existHashtag.id,
                    });
                });
                await Promise.all(promise);
                result = "success";
            }
        } catch (err) {
            console.error(err);
        }
        return result;
    },
    /**
     *
     * @param {Object} postDto 피드를 수정하기 위한 현재 세션 유저, 피드 idx, 수정할 피드 내용이 담긴 객체
     * @returns 상태코드를 구분하기 위한 문자열
     */
    updatePosts: async (postDto) => {
        try {
            const result = await Post.update(
                {
                    content: postDto.content,
                    updatedAt: Date.now(),
                },
                {
                    where: {
                        id: postDto.postId,
                        user_id: postDto.user,
                    },
                }
            );
            if (result[0] === 0) {
                return "forbidden";
            }
        } catch (err) {
            return "serverError";
        }
    },
    /**
     *
     * @param {Object} postDto 피드를 삭제하기 위한 현재 세션유저, 해당 피드 idx가 담긴 객체
     * @returns 상태코드를 구분하기 위한 문자열
     */
    destroyPosts: async (postDto) => {
        try {
            const result = await Post.destroy({
                where: {
                    id: postDto.postId,
                    user_id: postDto.user,
                },
            });
            if (result === 0) {
                return "forbidden";
            }
        } catch (err) {
            return "serverError";
        }
    },
    /**
     *
     * @param {Arary} files 클라이언트에서 선택하여 제출한 파일(이미지 혹은 동영상) 배열
     * @returns
     */
    uploadFile: async (files) => {
        const loadFeed = new LoadFeed();
        /* 새로운 피드 번호 가져와야함 */
        const newPostNum = await loadFeed.getNewPostNum();
        const urlArr = await uploadPostsImages(newPostNum, files);
        return urlArr;
    },
    /**
     *
     * @param {Object} likeDto 좋아요하는 유저와 해당 피드 idx를 담은 객체
     * @returns 좋아요가 추가되었는지("created"), 삭제되었는 지("destroy"), 에러가 발생했는 지(err)
     */
    updateHeart: async (likeDto) => {
        const dtoObject = {
            user_id: likeDto.user,
            post_id: likeDto.postId,
        };
        const findAlreadyLike = await Heart.findAll({
            where: dtoObject,
            raw: true,
        });
        if (findAlreadyLike.length === 0) {
            try {
                await Heart.create(dtoObject);
                return "created";
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await Heart.destroy({
                    where: dtoObject,
                });
                return "destroy";
            } catch (err) {
                console.error(err);
            }
        }
    },
    /**
     *
     * @param {Object} commentDto 댓글작성 시 해당 피드 idx, 현재 세션 유저, 댓글 내용이 담긴 객체
     * @returns 실패 시 err
     */
    insertComment: async (commentDto) => {
        try {
            await Comment.create({
                content: commentDto.content,
                user_id: commentDto.user,
                post_id: commentDto.postId,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
        } catch (err) {
            console.error(err);
        }
    },
    /**
     *
     * @param {Object} commentDto 댓글 수정 시 현재 세션 유저, 해당 댓글 idx, 수정할 댓글 내용이 담긴 객체
     * @returns db 처리결과에 따른 상태코드
     */
    updateComment: async (commentDto) => {
        try {
            const currentUserComments = await Comment.findAll({
                where: {
                    user_id: commentDto.user,
                },
                attributes: ["id"],
                raw: true,
            });
            const matchUserComment = currentUserComments.filter(
                (userComment) =>
                    userComment.id === parseInt(commentDto.commentId)
            );
            if (matchUserComment.length > 0) {
                /* 현재 세션유저가 작성한 댓글이 맞으면 */
                await Comment.update(
                    {
                        content: commentDto.content,
                        updatedAt: Date.now(),
                    },
                    {
                        where: {
                            id: commentDto.commentId,
                        },
                    }
                );
                return "created";
            } else {
                return "forbidden";
            }
        } catch (err) {
            console.error(err);
        }
    },
    /**
     *
     * @param {Object} commentDto 댓글 삭제 시 현재 세션 유저와 해당 댓글의 idx가 담긴 객체
     * @returns
     */
    destroyComment: async (commentDto) => {
        try {
            const result = await Comment.destroy({
                where: {
                    id: commentDto.commentId,
                    user_id: commentDto.user,
                },
            });
            if (result === 0) {
                return "notFound";
            }
        } catch (err) {
            console.error(err);
        }
    },
    /**
     *
     * @param {Number} postId 댓글 조회를 위한 해당 피드의 idx
     * @returns DB findAll 결과 or err
     */
    selectComment: async (postId) => {
        try {
            const findResult = await Comment.findAll({
                order: [["created_at", "ASC"]],
                attributes:["id","content","createdAt","updatedAt","post_id"],
                where: {
                    post_id: postId,
                },
                include: {
                    model: User,
                    required: true,
                    attributes: ["id","name","nick","image"],
                    nested:true
                },
            },
            );
            return findResult;
        } catch (err) {
            console.error(err);
        }
    },
};