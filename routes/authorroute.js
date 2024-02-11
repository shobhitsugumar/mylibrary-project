const express = require("express");
const router = express.Router();
const authorController = require("../contorller/authorContorller");

//all author routes
router.get("/", authorController.allAuthor);

//for new author
router.get("/new", authorController.newAuthor);

//create author route
router.post("/", authorController.crtAuthor);

//get one author
router.get("/:id", authorController.oneauthor);

//edit the author
router.get("/:id/edit", authorController.editauthor);

//update the author
router.put("/:id", authorController.updateauthor);

//Delete the author
router.delete("/:id", authorController.deleteauthor);

module.exports = router;
