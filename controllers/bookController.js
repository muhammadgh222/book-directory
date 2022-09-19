const multer = require("multer");
const sharp = require("sharp");
const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

/*const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `book-${Math.random()}.${ext}`);
  },
});*/

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(() => {
      console.log("Please upload image");
    }, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImg = upload.single("coverImg");

const addBook = async (req, res, next) => {
  try {
    let { authorId } = req.body;
    console.log(req.files);

    const bookAuthor = await Author.findById(authorId);
    console.log(bookAuthor);
    if (req.file) req.body.coverImg = req.file.filename;
    const newBook = await Book.create(req.body);
    //  const bookAuthor = await Author.findById(author);

    bookAuthor.books.push(newBook);

    bookAuthor.save();
    res.status(201).json({
      status: "success",
      newBook,
    });
  } catch (error) {
    console.log(error);
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

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  uploadImg,
};
