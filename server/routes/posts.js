const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController.js");

router.get("/",controller.getPosts);
// router.get("/:id",controller.getPostsId);

// router.post("/",controller.postPosts);

// router.put("/like",controller.putLike);
// router.put("/unlike",controller)


module.exports = router;