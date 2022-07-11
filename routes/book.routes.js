const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/books", (req,res,) => {

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


module.exports = router;
