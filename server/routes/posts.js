const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController.js");

router.get("/",controller.getPosts);



module.exports = router;