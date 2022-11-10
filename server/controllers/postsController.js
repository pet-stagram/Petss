const service = require("../services/postsService");
const path = require("path");
const upload = require("../routes/posts");

module.exports = {
    getPosts : async (req, res) =>{ 
            if(false){
                /* session이 없으면 401. 나중에 수정하기 */
                res.status(401).send("need login");
            }else{
                 try{
                    const postId = req.params.id;
                    let result;
                    if(postId===undefined){
                        result = await service.selectPostsAll(2);
                        if(result.length === 0){
                            res.status(204).send("nothing");
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
                    res.status(400).send(err);
            }
        }
    },
    postPosts : async (req , res) => {
        const files = req.files;
        
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
            console.log(err)
            res.status(400).send(err);
        }

        /* 파일 받아서 파베에 올리기 */
        /* 업로드하고 해당 url을 돌려줌 */
        // const url = await service.uploadFile(path.join(__dirname+ "../uploads/"+upload.name+),"flower.jpeg");
        // console.log(url);
    },
    getImages : (req, res)=>{
        const imgName = req.query.imgName;
        
        service.getImage(imgName);
    }
}