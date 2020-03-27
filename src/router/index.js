const express = require('express');
const book = require('./book');
const user = require('./user');
const register = require('./register');

const Router = express.Router();
Router
  .use('/book', book)
  .use('/user', user)
  .use('/register', register);

module.exports = Router;