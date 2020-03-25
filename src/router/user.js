const express = require('express');
const Router = express.Router();
const usersController = require('../controller/user');

Router
  .get('/', usersController.getUsers)
  .get('/:idUser', usersController.userDetail)
  .post('/insert', usersController.insertUser)
  .patch('/:idUser', usersController.updateUser);

module.exports = Router;