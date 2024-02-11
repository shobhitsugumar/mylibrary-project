const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

//for all authors
exports.allAuthor = async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  console.log(searchOptions);
  try {
    const allAuthor = await Author.find(searchOptions);

    res.render("author/authors", {
      authors: allAuthor,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.....
//get one author and view the books

exports.oneauthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();

    res.render("author/show", {
      author: author,
      booksByAuthor: books,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>....

//for new authors
exports.newAuthor = (req, res) => {
  res.render("author/new", { author: new Author(), errorMessage: null });
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.......

//to create a author
exports.crtAuthor = async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newauthor = await author.save();
    res.redirect(`/authors/${newauthor.id}`);
    //res.redirect("/authors");
  } catch (err) {
    res.render("author/new", {
      author: author,
      errorMessage: "Error in creating the author",
    });
  }
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//edit the author

exports.editauthor = async (req, res) => {
  try {
    const oneauthor = await Author.findById(req.params.id);
    res.render("author/edit", { author: oneauthor });
  } catch {
    res.redirect("/authors");
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.........

//update the author
exports.updateauthor = async (req, res) => {
  let author;
  try {
    author = await Author.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating Author",
      });
    }
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Delete the author

exports.deleteauthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      // If the author with the given ID doesn't exist, redirect to the home page
      return res.redirect("/");
    }
    // If the author is successfully deleted, redirect to the "/authors" page
    res.redirect("/authors");
  } catch (error) {
    // If an error occurs during the deletion process, redirect to the home page
    console.error("Error deleting author:", error);
    res.redirect("/");
  }
};

/*
exports.deleteauthor = async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.remove();
    res.redirect("/authors");
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
};
*/
