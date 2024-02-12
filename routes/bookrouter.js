const express = require("express");
const router = express.Router();
const bookController = require("../contorller/bookController");

router.get("/", bookController.allBooks);

router.get("/new", bookController.newbook);

router.post("/", bookController.createBook);

router.get("/:id", bookController.bookshow);

//show the edit page to the user
router.get("/:id/edit", bookController.editbook);

//edit it in the server
router.patch("/:id", bookController.updatebook);

router.delete("/:id", bookController.deletebook);

module.exports = router;
