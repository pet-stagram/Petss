const { post } = require("../routes/users");
const service = require("../services/postsService");
const File = require("file-class");

module.exports = {
    getPosts: async (req, res) => {
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else {
            try {
                const postId = req.params.id;
                let result;
                if (postId === undefined) {
                    result = await service.selectPostsAll(currentUser);
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
                console.error(err);
            }
        }
    },
    postPosts: async (req, res) => {
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else if (requestDto.files.length===0) {
            /* 클라이언트에서 파일 첨부를 하지 않았을 시 */
            res.sendStatus(400);
        }else{
            const requestDto = {
                files : req.files,
                content : req.body.content,
                user : currentUser // 세션유저
            }
            try {
                let fileUrl = await service.uploadFile(requestDto.files);
                
                const postDto = {
                    user: currentUser, // 현재 로그인 중인 유저의 idx
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

        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else if (isNaN(req.params.postId)) {
            res.sendStatus(404);
        }else {
            const postDto = {
                user: currentUser, // 현재 세션 유저
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
                console.error(err);
            }
        }
    },
    deletePosts: async (req, res) => {
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else if (isNaN(req.params.postId)) {
            res.sendStatus(404);
        }else {
            const postDto = {
                user: currentUser, //현재 세션 유저
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
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else {
            // 세션 아이디 -> 피드하나에 좋아요 클릭
            const likeDto = {
                postId: req.params.id,
                user: currentUser, //후에 세션 유저로 변경
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
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else{
            const commentDto = {
                postId: parseInt(req.body.postId),
                user: currentUser, // 현재 세션 유저
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
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else if (isNaN(req.params.commentId)) {
            res.sendStatus(404);
        }else {
            const commentDto = {
                user: currentUser, // 현재 세션 유저
                commentId: parseInt(req.params.commentId),
                content: req.body.content,
            };
            try {
                const updateResult = await service.updateComment(commentDto);
                if (updateResult === "forbidden") res.sendStatus(403);
                else res.sendStatus(201);
            } catch (err) {
                res.sendStatus(400);
                console.error(err);
            }
        }
    },
    deleteComment: async (req, res) => {
        
        const currentUser = req.session.u_id;
        if(!currentUser){
            res.sendStatus(401);
        }else if (isNaN(req.params.commentId)) {
            res.sendStatus(404);
        }else {
            const commentDto = {
                user: currentUser, // 현재 세션 유저
                commentId: parseInt(req.params.commentId),
            };
            try {
                const destroyResult = await service.destroyComment(commentDto);
                if (destroyResult === "notFound") res.sendStatus(404);
                else res.sendStatus(204);
            } catch (err) {
                res.sendStatus(403);
                console.error(err);
            }
        }
    },
    getComment : async (req, res)=>{
        const currentUser = req.session.u_id;
        const postId = req.params.postId;
        if(!currentUser){
            res.sendStatus(401);
        }else if (isNaN(req.params.postId)) {
            res.sendStatus(404);
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
