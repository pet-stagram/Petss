const service = require("../services/postsService");

module.exports = {
    getPosts : (req, res) =>{
        service.selectPostsAll;
    }
}