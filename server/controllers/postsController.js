const service = require("../services/postsService");
const path = require("path");
const upload = require("../routes/posts");

module.exports = {
    getPosts : async (req, res) =>{ 
            if(false){
                /* session이 없으면 401. 나중에 수정하기 */
                res.sendStatus(401);
            }else{
                 try{
                    const postId = req.params.id;
                    let result;
                    if(postId===undefined){
                        result = await service.selectPostsAll(1);
                        if(result.length === 0){
                            res.sendStatus(204);
                        }else{
                            res.status(200).json(result,null,2);
                        }
                    }else{
                    /* url에 params(:id)가 존재하는 경우 */
                        result = await service.selectPostOne(postId);
                        res.status(200).json(result,null,2);
                    }
                    /* parameter로 현재 세션의 idx값 */
                    
                 }catch(err){
                    res.sendStatus(500);
            }
        }
    },
    postPosts : async (req , res) => {
        const files = req.files;
        if(files.length===0){
            /* 클라이언트에서 파일 첨부를 하지 않았을 시 */
            res.sendStatus(400);
        }else{
            try{
                let fileUrl = await service.uploadFile(files);
                const postInfo = {
                    user : 1, // 현재 로그인 중인 유저의 idx
                    content : req.body.content,
                    fileUrl : fileUrl            
                }
                await service.insertPosts(postInfo);
                res.sendStatus(201);
            }catch(err){
                console.log(err);
                /* db연결 에러 */
                res.sendStatus(500);
            }
        }
    },
    putLike : async (req, res)=>{
        // 세션 아이디 -> 피드하나에 좋아요 클릭
        const likeDto = {
            postId : req.params.id,
            user : 1//후에 세션 유저로 변경
        }
        try{
            await service.updateHeart(likeDto);
            res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.sendStatus(400);
        }
    },
    postComment : async (req, res)=>{
        const commentDto = {
            postId : parseInt(req.body.postId),
            user : 1, // 지금 세션 유저
            content : req.body.content
        }
        try{
            await service.insertComment(commentDto);
            res.sendStatus(201);
        }catch(err){
            res.sendStatus(400);
        }
    }
}