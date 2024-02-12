//const multer = require("multer");
const Books = require("../models/bookModel");
const Author = require("../models/authorModel");
const fs = require("fs");
const path = require("path");

const imageMimeTypes = ["image/jpeg", "image1/png", "image/gif"];

/* in this we are using filepond instead of multer 
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
*/
/////////////////////////////////////////////////////////////////////

exports.allBooks = async (req, res) => {
  try {
    let bookquery = Books.find();

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
  //const fileName = req.file !== null ? req.file.filename : null;

  const book = new Books({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    //coverImage: fileName,
    summary: req.body.summary,
  });

  saveCover(book, req.body.Cover); // here in req.body,cover we will be getting the json format that have been encoded check the filepond encoded

  try {
    const newBook = await book.save();
    res.redirect("/books");
  } catch {
    /*if (book.coverImage != null) {
      console.log(book.coverImage);
      removeBookCoverImage(book.coverImage);
    }*/
    renderNewPage(res, book, true);
  }
};

exports.bookshow = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id).populate("author");
    res.render("books/show", {
      book: book,
    });
  } catch {
    res.redirect("/");
  }
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//show the edit page to the client
exports.editbook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    renderEditPage(res, book);
  } catch {
    res.redirect("/");
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//update it when user click update
exports.updatebook = async (req, res) => {
  let updatebook;
  try {
    updatebook = await Books.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author,
      publishDate: new Date(req.body.publishDate),
      pageCount: req.body.pageCount,
      summary: req.body.summary,
    });
    console.log(req.body.Cover);
    if (req.body.Cover != null && req.body.Cover !== "") {
      saveCover(updatebook, req.body.Cover);
    }

    res.redirect(`/books/${updatebook.id}`);
  } catch {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      redirect("/");
    }
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deletebook = async (req, res) => {
  let deletebook;
  try {
    deletebook = await Books.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch {
    res.redirect(`/books/${deletebook.id}`);
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

/*function removeBookCoverImage(fileName) {
  fs.unlink(path.join("public/img/bookCover", fileName), (err) => {
    if (err) console.error(err);
  });
}
*/

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;

  const Cover = JSON.parse(coverEncoded);
  if (Cover != null && imageMimeTypes.includes(Cover.type)) {
    //we cant store the data as string because the cover image type is buffer
    book.coverImage = new Buffer.from(Cover.data, "base64");

    //saving the cover image type as jpeg or png
    book.coverImageType = Cover.type;
  }
}

async function renderEditPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book,
    };
    if (hasError) {
      params.errorMessage = "Error in Updating";
    } else {
      params.errorMessage = "Error Creating Book";
    }
    res.render("books/edit", params);
  } catch {
    res.redirect("/books");
  }
}
