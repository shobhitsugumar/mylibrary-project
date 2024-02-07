const express = require("express");
const router = express.Router();
const indexController = require("../contorller/indexController");

router.get("/", indexController.index);

module.exports = router;
