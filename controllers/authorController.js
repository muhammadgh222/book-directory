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
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const authors = await Author.find(queryObj).populate(
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

const updateAuthor = async (req, res, next) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: "success",
      updatedAuthor,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    await Author.findByIdAndDelete(req.params.id);

    res.status(201).json({
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
  addAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
