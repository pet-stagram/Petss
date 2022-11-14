const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController")
const upload = require("../module/upload");

router.get("/:userId",controller.getUser);

router.get("/:userId/posts",controller.getUserPosts);

router.put("/:userId",controller.putUser);
router.post("/:userId/image",upload.single('file'),controller.postUserImage);


module.exports = router;