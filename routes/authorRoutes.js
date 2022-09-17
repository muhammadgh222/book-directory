const express = require("express");
const {
  addAuthor,
  getAllAuthors,
  getAuthor,
} = require("../controllers/authorController");
const router = express.Router();

router.post("/", addAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthor);

module.exports = router;
