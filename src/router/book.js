const express = require('express');
const Router = express.Router();
const booksController = require('../controller/book');

Router
  .get('/', booksController.getBooks)
  .get('/loan', booksController.loanList)
  .get('/:idBook', booksController.bookDetail)
  .post('/insert', booksController.insertBook)
  .post('/loan', booksController.loanBook)
  // .post('/restore', booksController.restoreBook)
  .patch('/:idBook', booksController.updateBook)
  .delete('/:idBook', booksController.deleteBook);

module.exports = Router;