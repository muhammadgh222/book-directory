const multer = require("multer");
const sharp = require("sharp");

const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(() => console.log("Please add an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImg = upload.single("coverImg");

const resizeImg = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `book-${Math.random()}.jpeg`;
  console.log(req.file.buffer);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(`public/img/${req.file.filename}`);

  next();
};

const addBook = async (req, res, next) => {
  try {
    if (req.file) req.body.coverImg = req.file.filename;
    console.log(req.body);
    console.log(req.file);
    const {title, author, desc, pagesNumber, coverImg, publishDate} = req.body;
    const newBook = await Book.create({
      title,
      author,
      desc,
      pagesNumber,
      coverImg,
      publishDate,
    });

    const bookAuthor = await Author.findById(req.body.author);

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

module.exports = {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  uploadImg,
  resizeImg,
};
