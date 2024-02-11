const mongoose = require("mongoose");
const Book = require("./bookModel");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre("remove", function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (book.length > 0) {
      next(new Error("This author has book still"));
    } else {
      next();
    }
  });
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
