const express = require('express');
const Router = express.Router();
const usersController = require('../controller/user');

Router
  .post('/', usersController.insertUser);

module.exports = Router;