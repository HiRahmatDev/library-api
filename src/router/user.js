const express = require('express');
const Router = express.Router();
Router
  .get('/user', (req, res) => {
    res.send('halaman user');
  })

module.exports = Router;