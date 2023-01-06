const express = require("express");
const router = express.Router();
const controller = require("../controllers/searchController");

router.get("/search",controller.getSearch);
// router.get("/hashtag",controller.getHashtag);
// router.get("/nick",controller.getUserNick);
// router.get("/name",controller.getUserName);
module.exports = router;