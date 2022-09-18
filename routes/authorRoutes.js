const express = require("express");
const {
  addAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const router = express.Router();

router.post("/", addAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthor);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
