const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get('/login',controller.getLogin);
router.post('/register',controller.postRegister);


module.exports = router;