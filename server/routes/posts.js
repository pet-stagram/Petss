const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController.js");

router.get("/",controller.getPosts);
router.get("/:id",controller.getPostsWithId);

module.exports = router;