const express = require("express");
const router = express.Router();
const controller = require("")

router.get("/:userId/posts",controller.getUserPosts);


module.exports = router;