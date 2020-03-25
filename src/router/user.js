const express = require('express');
const Router = express.Router();
const usersController = require('../controller/user');

Router
  .get('/', usersController.getUsers);

module.exports = Router;