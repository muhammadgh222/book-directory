const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    description: {
      type: String,
      required: [true, "A book must have a description"],
      default: "",
    },
    pagesNumber: {
      type: Number,
      required: [true, "A book must have a pages number"],
      default: 0,
    },
    coverImg: {
      type: String,
      required: [true, "A book must have a cover image"],
      default: "https://via.placeholder.com/150",
    },
    publishDate: {
      type: Date,
      required: [true, "A book must have a publish date"],
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
