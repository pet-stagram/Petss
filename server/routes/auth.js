const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/login",controller.postLogin);//로그인
router.get("/logout",controller.getLogout);//로그아웃
router.post("/register",controller.postRegister);//회원가입 화면에서 회원가입눌렀을 때 처리하는,
router.post("/email",controller.postEmail);//인증메일 
router.post("/emailcheck",controller.postEmailCheckNum);//인증확인


module.exports = router;