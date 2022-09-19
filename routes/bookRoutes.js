const express = require("express");
const {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  uploadImg,
} = require("../controllers/bookController");

const router = express.Router();

router.post("/", uploadImg, addBook);
router.get("/", getAllBooks);
router.get("/:id", getBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
