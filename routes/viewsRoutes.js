const express = require("express");
const {getAllAuthors} = require("../controllers/viewsController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/authors", getAllAuthors);
router.get("/books/new", (req, res) => {
  res.render("books/new");
});

router.get("/authors/new", (req, res) => {
  res.render("authors/new");
});

module.exports = router;
