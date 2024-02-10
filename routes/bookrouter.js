const express = require("express");
const router = express.Router();
const bookController = require("../contorller/bookController");

router.get("/", bookController.allBooks);

router.get("/new", bookController.newbook);

router.post("/", bookController.createBook);

module.exports = router;
