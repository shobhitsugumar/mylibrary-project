const mongoose = require("mongoose");
//const path = require("path");

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
    type: Buffer,
    required: [true, "Enter the cover image for the Book"],
  },
  coverImageType: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

/* this when we used multer 
bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null) {
    return path.join("/img/bookCover", this.coverImage);
  }
});*/

//filepond here we are converting the coverImage type buffer to actul image
bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
