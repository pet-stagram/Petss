const express = require("express");
const { app } = require('firebase-admin');
const router = express.Router();
const controller = require("../controllers/chatController");
const upload = require("../module/upload");

router.get("/rooms", controller.getChatRooms);

module.exports = router;