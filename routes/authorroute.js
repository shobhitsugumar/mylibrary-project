const express = require("express");
const router = express.Router();
const authorController = require("../contorller/authorContorller");

//all author routes
router.get("/", authorController.allAuthor);

//for new author
router.get("/new", authorController.newAuthor);

//create author route
router.post("/", authorController.crtAuthor);

module.exports = router;
