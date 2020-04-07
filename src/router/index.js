const express = require('express');
const book = require('./book');
const user = require('./user');
const register = require('./register');
const category = require('./category');

const Router = express.Router();
Router
  .use('/book', book)
  .use('/user', user)
  .use('/register', register)
  .use('/category', category);

module.exports = Router;