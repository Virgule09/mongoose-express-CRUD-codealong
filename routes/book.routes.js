const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/books", (req,res, next) => {

  Book.find()
    .then( (booksFromDB) => {
      const data = {
        booksArr: booksFromDB
      };
      res.render("books/books-list", data);
    })
    .catch( error => {
      console.log("error getting data from DB", error)
    })
  })
  
router.get("/books/create", (req, res) => {
  res.render("books/book-create");
})

router.post("/books/create", (req,res,next) => {
  const bookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  }

  Book.create(bookDetails)
    .then( () => {
      res.redirect("/books")
    })
    .catch( error => {
      console.log("error creating a book in the DB", error)
    })
})

router.get("/books/:bookId", (req, res, next) => {

  Book.findById(req.params.bookId)
    .then( (book) => {
    res.render("books/book-details", book);
  })
    .catch(error => {
      console.log("error getting data from DB", error);
      next(error);
    })
  }) 

router.get("/books"), (req,res,next) => {
  const rating = parseFloat(req.query.min-rating);
  console.log(rating)
  Book.find({rating: {$gte: rating}})
  .then( (book) => {
    res.render("books/book-details", book);
  })
  .catch(error => {
    console.log("error getting data from DB", error);
    next(error);
  })
}


module.exports = router;
