const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

const addBook = async (req, res, next) => {
  try {
    const { title, author, description, pagesNumber, coverImg, publishDate } =
      req.body;
    const newBook = await Book.create({
      title,
      author,
      description,
      pagesNumber,
      coverImg,
      publishDate,
    });

    const bookAuthor = await Author.findById(author);
    console.log(bookAuthor);
    bookAuthor.books.push(newBook);

    bookAuthor.save();
    res.status(201).json({
      status: "success",
      newBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({}).populate("author");

    res.status(201).json({
      status: "success",
      books,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

module.exports = { addBook, getAllBooks };
