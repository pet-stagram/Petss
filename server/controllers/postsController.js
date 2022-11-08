const service = require("../services/postsService");

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
    }
}