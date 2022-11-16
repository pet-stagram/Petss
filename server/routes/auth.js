const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");


router.get("/login",controller.getLogin);
router.post("/register",controller.postRegister);//이메일인증확인여부도
router.post("/email",controller.postEmail);
router.post("/emailcheck",controller.postEmailCheckNum);//번호입력 후 인증확인 눌렀을때 


module.exports = router;