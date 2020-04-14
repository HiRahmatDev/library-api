const express = require('express');
const Router = express.Router();
const booksController = require('../controller/book');
const redisHelper = require('../helper/redis');

// multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname || 'default-image.jpg');
  },
  // setting file extension and size minimum here

});
const upload = multer({
  storage
});

Router
  .get('/', redisHelper.cacheGetAllBook, booksController.getBooks)
  .get('/loan', booksController.loanList)
  .get('/:idBook', redisHelper.clearGetAllBook, booksController.bookDetail)
  .post('/loan/:user/:book', booksController.loanBook)
  .post('/insert', redisHelper.clearGetAllBook, upload.single('img'), booksController.insertBook)
  .patch('/return', booksController.returnBook)
  .patch('/:idBook', redisHelper.clearGetAllBook, upload.single('img'), booksController.updateBook)
  .delete('/:idBook', redisHelper.clearGetAllBook, booksController.deleteBook);

module.exports = Router;