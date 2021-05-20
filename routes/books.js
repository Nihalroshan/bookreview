const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//Get all books
router.get("/", async (req, res) => {
 
  try {
    let user = req.session.user;
    const books = await Book.find();
    res.render("books/index", {
      books: books,
      user: user,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
  
});

//new book
router.get("/add", (req, res) => {
  let user = req.session.user;
  if (!user) {
    return res.redirect("/users/login");
  }
  res.render("books/addBook", { book: new Book(), user: user });
});

//Create a book
router.post("/", async (req, res) => {
  const book = new Book({
    userId: req.session.user._id,
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

router.get("/genres", (req, res) => {
  let user = req.session.user;
  res.render("books/genres", { book: new Book(), user: user });
});

router.get("/genres/:genre", async (req, res) => {
  let user = req.session.user;
  const books = await Book.find({ genre: new RegExp(req.params.genre, "i") });
  res.render("books/index", { books: books, user: user });
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    let user = req.session.user;
    const book = await Book.findById(req.params.id);
    res.render("books/singleBook", { book: book, user: user });
  } catch {
    redirect("/books");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let user = req.session.user;
    if (!user) {
      return res.redirect("/users/login");
    }
    const book = await Book.findById(req.params.id);
    res.render("books/editBook", { book: book, user: user });
  } catch {
    res.redirect("/books");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        language: req.body.language,
        coverUrl: req.body.coverUrl,
        description: req.body.description,
        year: req.body.year,
        isbn: req.body.isbn,
        genre: req.body.genre,
        getBook: req.body.getBook,
      },
      { new: true }
    );
    res.redirect(`/books/${book.id}`);
  } catch {
    res.render("books/editBook", { book: book });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch {
    res.render("books/index", { books: books });
  }
});

module.exports = router;
