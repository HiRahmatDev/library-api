require('dotenv').config();
const userModel = require('../model/user');
const MiscHelper = require('../helper/helper');
const jwt = require('jsonwebtoken');
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
        const resultObj = result[0];
        MiscHelper.response(res, resultObj, 200);
      })
      .catch(err => res.send(err));
  },
  insertUser: (req, res) => {
    const {email, username, fullname, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const data = {
      email,
      username,
      fullname,
      password: hashedPassword,
      salt,
      // token: '#da',
      // phone,
      role_id: 2,
      photo: 'https://i.stack.imgur.com/l60Hf.png',
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
      .then((result) => {
        const dataUser = result[0];
        const checkedPass = bcrypt.compareSync(dataLogin.password, dataUser.password);
        const token = jwt.sign({ id: dataUser.id, email: dataUser.email }, process.env.SECRET_KEY);
        dataUser.token = token;
        delete dataUser.password;
        delete dataUser.salt;
        if (checkedPass) {
          MiscHelper.response(res, dataUser, 200);
        }
        MiscHelper.response(res, null, 202, 'Wrong Password!');
      })
      .catch((err) => {
        MiscHelper.response(res, err, 202, 'Email not found!');
      });
  },
  updateUser: (req, res) => {
    const idUser = req.params.idUser;
    const {email, fullname, password, phone} = req.body;
    const data = {email, fullname, password, phone};
    userModel.updateUser(data, idUser)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  emailVerified: (req, res) => {
    res.status(200).json({
      status: 'Success!',
      statusCode: 200,
      msg: 'Your email has been activated'
    });
  },
};

module.exports = userController;