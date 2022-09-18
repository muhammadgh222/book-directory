const Author = require("../models/authorModel");

const getAllAuthors = async (req, res) => {
  const authors = await Author.find({});

  res.render("authors/index", {
    title: "Authors",
    authors,
  });
};

module.exports = { getAllAuthors };
