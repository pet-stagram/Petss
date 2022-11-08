const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

router.get('/',controller.getAdmin);


module.exports = router;