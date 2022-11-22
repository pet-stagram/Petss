const express = require("express");
const router = express.Router();
const controller = require("../controllers/searchController");

router.get("/hashtag",controller.getHashtag);
router.get("/usernick",controller.getUsernick);


module.exports = router;