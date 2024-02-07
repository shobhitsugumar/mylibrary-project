const Author = require("../models/authorModel");

//for all authors
exports.allAuthor = async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  console.log(searchOptions);
  try {
    const allAuthor = await Author.find(searchOptions);
    console.log(allAuthor);
    res.render("author/authors", {
      authors: allAuthor,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
};

//for new authors
exports.newAuthor = (req, res) => {
  res.render("author/new", { author: new Author(), errorMessage: null });
};

//to create a author
exports.crtAuthor = async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  console.log(author);
  try {
    const newauthor = await author.save();
    /*res.redirect("/authros/newauthor.id");*/
    res.redirect("/authors");
  } catch (err) {
    res.render("author/new", {
      author: author,
      errorMessage: "Error in creating the author",
    });
  }
};
