const userModel = require('../model/user');
const MiscHelper = require('../helper/helper');
// const con = require('../config/db');
const bcrypt = require('bcrypt');
const userController = {
  getUsers: (req, res) => {
    userModel.getUsers()
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => res.send(err));
  },
  userDetail: (req, res) => {
    const idUser = req.params.idUser;
    userModel.userDetail(idUser)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => res.send(err));
  },
  insertUser: (req, res) => {
    const {email, fullname, password, phone} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const data = {
      card_number: parseInt('1152030115'),
      email,
      fullname,
      password: hashedPassword,
      salt,
      token: '#da',
      phone,
      role_id: 2,
      photo: 'default.jpg',
      status: 0
    };
    userModel.insertUser(data)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  loginUser: (req, res) => {
    const {email, password} = req.body;
    const dataLogin = {email, password};
    userModel.loginUser(dataLogin)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        MiscHelper.response(res, err, 400);
      });
  },
  updateUser: (req, res) => {
    const idUser = req.params.idUser;
    const {email, fullname, password, phone} = req.body;
    const data = {email, fullname, password, phone};
    userModel.updateUser(data, idUser)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  }
};

module.exports = userController;