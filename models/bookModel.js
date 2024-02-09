const mongoose = require("mongoose");
const path = require("path");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: [true, "Enter the page count"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: String,
    required: [true, "Enter the cover image for the Book"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null) {
    return path.join("/img/bookCover", this.coverImage);
  }
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
