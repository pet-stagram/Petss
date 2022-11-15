const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController")
const upload = require("../module/upload");

router.get("/:userId",controller.getUser);

router.get("/:userId/posts",controller.getUserPosts);

/* html form에 PUT Method가 존재하지 않음
    추후 수정 필요 (ex. PUT -> POST ) */
router.put("/:userId/info",controller.putUserInfo);

router.post("/:userId/image",upload.single('file'),controller.postUserImage);

router.put("/follow",controller.putFollow);

router.post("/invoice",controller.postInvoice);

module.exports = router;