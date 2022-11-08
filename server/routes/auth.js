const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/login",controller.getLogin);
router.post("/register",controller.postRegister);
router.post("/email",controller.postEmail);
//router.post("/email/duplicate",controller.postEmailDuplicate); //email중복체크

module.exports = router;