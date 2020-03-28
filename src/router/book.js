const express = require('express');
const Router = express.Router();
const booksController = require('../controller/book');

Router
  .get('/', booksController.getBooks)
  .get('/:idBook', booksController.bookDetail)
  .post('/insert', booksController.insertBook)
  .patch('/:idBook', booksController.updateBook)
  .delete('/:idBook', booksController.deleteBook)
  .get('/loan', booksController.loanBook);

module.exports = Router;