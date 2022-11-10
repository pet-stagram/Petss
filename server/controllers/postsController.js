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
                        result = await service.selectPostsAll(2);
                        if(result.length === 0){
                            res.sendStatus(204);
                        }else{
                            res.status(200).send(JSON.stringify(result,null,2));
                        }
                    }else{
                    /* url에 params(:id)가 존재하는 경우 */
                        result = await service.selectPostOne(postId);
                        res.status(200).send(JSON.stringify(result,null,2));
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
    getImages : (req, res)=>{
        const imgName = req.query.imgName;
        
        service.getImage(imgName);
    }
}