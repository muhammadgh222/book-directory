const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

const addBook = async (req, res, next) => {
  try {
    const {title, author, description, pagesNumber, coverImg, publishDate} =
      req.body;
    const newBook = await Book.create({
      title,
      author,
      description,
      pagesNumber,
      coverImg,
      publishDate,
    });

    const bookAuthor = await Author.findOne({name: author});

    if (!bookAuthor) {
      res.status(404).json({
        status: "failed",
        message: "Please create the author first",
      });
    }

    //  const bookAuthor = await Author.findById(author);

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

const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");

    res.status(201).json({
      status: "success",
      book,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    console.log(book);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

module.exports = {addBook, getAllBooks, getBook, updateBook, deleteBook};
