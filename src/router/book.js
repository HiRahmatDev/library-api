const express = require('express');
const Router = express.Router();
const booksController = require('../controller/book');
// const redisHelper = require('../helper/redis');

// multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // setting file extension and size minimum here

});
const upload = multer({
  storage
});

Router
  .get('/', booksController.getBooks)
  .get('/loan', booksController.loanList)
  .get('/:idBook', booksController.bookDetail)
  .post('/insert', upload.single('img'), booksController.insertBook)
  .post('/loan', booksController.loanBook)
  // .post('/restore', booksController.restoreBook)
  .patch('/:idBook', booksController.updateBook)
  .delete('/:idBook', booksController.deleteBook);

module.exports = Router;