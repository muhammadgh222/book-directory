const Author = require("../models/authorModel");

const addAuthor = async (req, res, next) => {
  try {
    const { name, books } = req.body;
    const newAuthor = await Author.create({ name, books });

    res.status(201).json({
      status: "success",
      newAuthor,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find({}).populate(
      "books",
      "title description pagesNumber coverImg"
    );

    res.status(201).json({
      status: "success",
      authors,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};
const getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");

    res.status(201).json({
      status: "success",
      author,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

module.exports = { addAuthor, getAllAuthors, getAuthor };
