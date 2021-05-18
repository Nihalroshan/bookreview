const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//Get all books
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.title !== null && req.query.title !== "") {
    searchOptions.title = new RegExp(req.query.title, "i");
  }
  try {
    const books = await Book.find(searchOptions);
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
    // res.send(books);
  } catch {
    res.redirect("/");
  }
});

//get a single book

//new book
router.get("/add", (req, res) => {
  res.render("books/addBook", { author: new Book() });
});

//Create a book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    language: req.body.language,
    coverUrl: req.body.coverUrl,
    description: req.body.description,
    year: req.body.year,
    isbn: req.body.isbn,
    genre: req.body.genre,
    getBook: req.body.getBook,
  });
  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch {
    res.render("books/addBook", {
      book: book,
      errorMessage: "Error creating book.",
    });
  }
});

module.exports = router;
