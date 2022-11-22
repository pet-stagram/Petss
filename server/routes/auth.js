const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { isNotLogginedin, isLogginedIn } = require("../middlewares/middlewares");
const middleware = require("../middlewares/middlewares");

router.get("/log",controller.getLog);
router.post("/login",isNotLogginedin,controller.postLogin);//로그인
router.get("/logout",isLogginedIn,controller.getLogout);//로그아웃
router.post("/register",controller.postRegister);//회원가입 화면에서 회원가입눌렀을 때 처리하는,
router.post("/email",controller.postEmail);//인증메일 
router.post("/emailcheck",controller.postEmailCheckNum);//인증확인
router.get("/nick",controller.postNick);//닉넴확인


module.exports = router;