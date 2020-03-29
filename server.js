require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const bodyParser = require('body-parser');
const router = require('./src/router/index.js');
const cors = require('cors');
const api = '/api/v1';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(api, router);
app.listen(port, () => {
  console.log('server is running on http://localhost:' + port + api);
});