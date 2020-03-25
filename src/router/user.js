const express = require('express');
const Router = express.Router();
const usersController = require('../controller/user');

Router
  .get('/', usersController.getUsers)
  .get('/:idBook', usersController.userDetail);

module.exports = Router;