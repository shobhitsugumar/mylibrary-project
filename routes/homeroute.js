const express = require("express");
const router = express.Router();
const homeController = require("../contorller/homeController");

router.get("/", homeController.homepage);

module.exports = router;
