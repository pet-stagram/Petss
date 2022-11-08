const service = require("../services/postsService");

module.exports = {
    getPosts : async (req, res) =>{
    
        try{
            const result = await service.selectPostsAll(2);    
            console.log(JSON.stringify(result));
            res.status(200).send(JSON.stringify(result,null,2));  
        }catch(err){
            console.log(err);
        }
    /* parameter로 현재 세션의 idx값 */

    }
}