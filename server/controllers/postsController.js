const service = require("../services/postsService");

module.exports = {
    getPosts : async (req, res) =>{
            /* session이 있으면 @ 나중에 수정하기 */
            if(false){
                res.status(401).send("need login");
            }else{
            try{
                /* parameter로 현재 세션의 idx값 */
                const result = await service.selectPostsAll(2);    
                res.status(200).send(JSON.stringify(result,null,2));
            }catch(err){
                res.status(400).send(err);
            }
        }
    },
    getPostsId : async (req, res) => {
            const postId = req.params.id;
            try{
                const result = await service.selectPostOne(postId);
                res.status(200).send(JSON.stringify(result,null,2));
            }
            catch(err){
                res.status(400).send(err);
            }
    }
}