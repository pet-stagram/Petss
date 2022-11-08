const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get('/login',controller.getLogin);
router.post('/register',controller.postRegister);
//router.post('/register/id-duplicate',controller.postIdDuplicate);

module.exports = router;