const express = require('express');
const book = require('./book');
const user = require('./user');

const Router = express.Router();
Router
  .use('/book', book)
  .use('/user', user);

module.exports = Router;