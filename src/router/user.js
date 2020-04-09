const express = require('express');
const Router = express.Router();
const usersController = require('../controller/user');

Router
  .get('/', usersController.getUsers)
  .get('/confirm', usersController.confirmUser)
  .get('/:idUser', usersController.userDetail)
  .patch('/:idUser', usersController.updateUser)
  .post('/send', usersController.sendEmailVerif)
  .post('/login', usersController.loginUser);

module.exports = Router;