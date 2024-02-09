//for indexhome router
const Books = require("../models/bookModel");

exports.homepage = async (req, res) => {
  let books;
  try {
    books = await Books.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
  res.render("home", { books: books });
};
