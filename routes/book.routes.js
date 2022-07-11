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

  // filter
router.get("/books"), (req,res,next) => {
  const rating = parseFloat(req.query.min-rating);
  console.log(rating)
  Book.find({rating: {$gte: rating}})
  .then( (booksfromDB) => {
    const data = {
      booksArr: booksFromDB
    };
    res.render("books/books-list", data);
  })
  .catch(error => {
    console.log("error getting data from DB", error);
    next(error);
  })
}

// update
router.get("/books/:bookId/edit", (req,res,next) => {
  
  Book.findById(req.params.bookId)
  .then( (bookDetails) => {
    res.render("books/book-edit", bookDetails)
  })
  .catch(error => {
    console.log("error updating a book", error);
    next(error);
  })
})

router.post("/books/:bookId/edit"), (req,res,next) => {

  const bookId = req.params.bookId;
  const newDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  };
  Book.findByIdAndUpdate(bookId, newDetails)
  .then( () => {
    res.redirect("/books")
  })
  .catch(error => {
    console.log("error updating a book", error);
    next(error);
  })
}

// Delete
router.post("/books/:bookId/delete", (req, res) => {
  const {bookId} = req.params;

  Book.findByIdAndRemove(bookId)
  .then( () => {
    res.redirect("/books")
  })
  .catch(error => {
    console.log("error deleting a book", error);
    next(error);
  })
})
  

module.exports = router;
