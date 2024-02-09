const multer = require("multer");
const Books = require("../models/bookModel");
const Author = require("../models/authorModel");
const fs = require("fs");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/bookCover");
  },
  filename: (req, file, callback) => {
    const extenstion = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, "image-" + uniqueSuffix + "." + extenstion);
  },
});

const multerfilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image files are allowed", false));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerfilter,
});

exports.uploadbookCoverimage = upload.single("Cover");

/////////////////////////////////////////////////////////////////////

exports.allBooks = async (req, res) => {
  try {
    let bookquery = Books.find();
    //console.log("book ", query);
    console.log(req.query.title);

    if (req.query.title != null && req.query.title !== "") {
      bookquery = bookquery.regex("title", new RegExp(req.query.title, "i"));
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore !== "") {
      bookquery = bookquery.lte("publishDate", req.query.publishedBefore);
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter !== "") {
      bookquery = bookquery.gte("publishDate", req.query.publishedBefore);
    }

    const books = await bookquery.exec();
    res.render("books/books", { books: books, searchOptions: req.query });
  } catch {
    res.redirect("/books");
  }
};

exports.newbook = async (req, res) => {
  renderNewPage(res, new Books());
};

exports.createBook = async (req, res) => {
  const fileName = req.file !== null ? req.file.filename : null;

  const book = new Books({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImage: fileName,
    summary: req.body.summary,
  });
  try {
    const newBook = await book.save();
    res.redirect("/books");
  } catch {
    if (book.coverImage != null) {
      console.log(book.coverImage);
      removeBookCoverImage(book.coverImage);
    }
    renderNewPage(res, book, true);
  }
};

///////////////////////////////////////////////////////////////////////////////////////
//functions

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) params.errorMessage = "Error Creating Book";

    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
}

function removeBookCoverImage(fileName) {
  fs.unlink(path.join("public/img/bookCover", fileName), (err) => {
    if (err) console.error(err);
  });
}
