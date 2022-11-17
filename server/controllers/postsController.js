const service = require("../services/postsService");

module.exports = {
    getPosts: async (req, res) => {
        if (false) {
            /* session이 없으면 401. 나중에 수정하기 */
            res.sendStatus(401);
        } else {
            try {
                const postId = req.params.id;
                let result;
                if (postId === undefined) {
                    result = await service.selectPostsAll(1);
                    if (result.length === 0) {
                        res.sendStatus(204);
                    } else {
                        res.status(200).json(result, null, 2);
                    }
                } else {
                    /* url에 params(:id)가 존재하는 경우 */
                    result = await service.selectPostOne(postId);
                    res.status(200).json(result, null, 2);
                }
                /* parameter로 현재 세션의 idx값 */
            } catch (err) {
                res.sendStatus(500);
            }
        }
    },
    postPosts: async (req, res) => {
        
        const {files, content} = req.body;
        console.log(content);
        console.log(files);

        if (files.length === 0) {
            /* 클라이언트에서 파일 첨부를 하지 않았을 시 */
            res.sendStatus(400);
        } else if (false) {
            /* 세션 없을 때 */
            res.sendStatus(401);
        }
        /* 세션 없으면 401 보내주기 */
        // else if(!req.session.user){res.sendStatus(401);}
        else {
            try {
                let fileUrl = await service.uploadFile(files);
                const postDto = {
                    user: 1, // 현재 로그인 중인 유저의 idx
                    content: req.body.content,
                    fileUrl: fileUrl,
                };
                await service.insertPosts(postDto);
                res.sendStatus(201);
            } catch (err) {
                console.log(err);
                /* db연결 에러 */
                res.sendStatus(500);
            }
        }
    },
    putPosts: async (req, res) => {
        if (isNaN(req.params.postId)) {
            res.sendStatus(404);
        } else if (false) {
            /* 세션 없을 때 */
            res.sendStatus(401);
        } else {
            const postDto = {
                user: 1, // 현재 세션 유저
                postId: req.params.postId,
                content: req.body.content,
            };
            try {
                const updateResult = await service.updatePosts(postDto);
                if (updateResult === "forbidden") res.sendStatus(403);
                else if (updateResult === "serverError") res.sendStatus(500);
                else res.sendStatus(201);
            } catch (err) {
                res.sendStatus(400);
                throw err;
            }
        }
    },
    deletePosts: async (req, res) => {
        if (isNaN(req.params.postId)) {
            res.sendStatus(404);
        } else if (false) {
            /* 세션 없을 때 */
            res.sendStatus(401);
        } else {
            const postDto = {
                user: 1, //현재 세션 유저
                postId: req.params.postId,
            };
            try {
                const destroyResult = await service.destroyPosts(postDto);
                if (destroyResult === "forbidden") res.sendStatus(403);
                else if (destroyResult === "serverError") res.sendStatus(500);
                else res.sendStatus(204);
            } catch (err) {
                res.sendStatus(400);
            }
        }
    },
    putLike: async (req, res) => {
        /* 세션 없으면 401 보내주기 */
        // if(!req.session.user){res.sendStatus(401);}
        if (false) {
            // 세션없음
            res.sendStatus(401);
        } else {
            // 세션 아이디 -> 피드하나에 좋아요 클릭
            const likeDto = {
                postId: req.params.id,
                user: 1, //후에 세션 유저로 변경
            };

            try {
                await service.updateHeart(likeDto);
                res.sendStatus(200);
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        }
    },
    postComment: async (req, res) => {
        if (false) {
            /* 세션없을때 */
            res.sendStaus(401);
        }else{
            const commentDto = {
                postId: parseInt(req.body.postId),
                user: 1, // 현재 세션 유저
                content: req.body.content,
            };
            try {
                await service.insertComment(commentDto);
                res.sendStatus(201);
            } catch (err) {
                res.sendStatus(400);
            }
        }
    },
    putComment: async (req, res) => {
        if (isNaN(req.params.commentId)) {
            res.sendStatus(404);
        } else if (false) {
            /* 세션 없을 때 */
            res.sendStatus(401);
        }
        /* 세션 없으면 401 보내주기 */
        // else if(!req.session.user){res.sendStatus(401);}
        else {
            const commentDto = {
                user: 1, // 현재 세션 유저
                commentId: parseInt(req.params.commentId),
                content: req.body.content,
            };
            try {
                const updateResult = await service.updateComment(commentDto);
                if (updateResult === "forbidden") res.sendStatus(403);
                else res.sendStatus(201);
            } catch (err) {
                res.sendStatus(400);
                throw err;
            }
        }
    },
    deleteComment: async (req, res) => {
        if (isNaN(req.params.commentId)) {
            res.sendStatus(404);
        }
        /* 세션 없으면 401 보내주기 */
        // else if(!req.session.user){res.sendStatus(401);}
        else {
            const commentDto = {
                user: 1, // 현재 세션 유저
                commentId: parseInt(req.params.commentId),
            };
            try {
                const destroyResult = await service.destroyComment(commentDto);
                if (destroyResult === "notFound") res.sendStatus(404);
                else res.sendStatus(204);
            } catch (err) {
                res.sendStatus(403);
                throw err;
            }
        }
    },
    getComment : async (req, res)=>{
        const postId = req.params.postId;
        if (isNaN(req.params.postId)) {
            res.sendStatus(404);
        }else if(false){
            /* 세션 없으면 401 */
            res.sendStatus(401);
        }else{
            try{
                const selectResult = await service.selectComment(postId);
                res.status(200).json(selectResult);
            }catch(err){
                res.sendStatus(400);
            }
        }
    }
};
