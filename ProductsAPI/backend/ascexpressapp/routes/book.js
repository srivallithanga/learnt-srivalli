const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");

router.post("/", bookController.createBook);
router.get("/", bookController.getBooksWithAuthors);

module.exports = router;
