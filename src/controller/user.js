const userModel = require('../model/user');
const MiscHelper = require('../helper/helper');
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
      email,
      fullname,
      password: hashedPassword,
      salt,
      // token: '#da',
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
        const checkedPass = bcrypt.compareSync(dataLogin.password, result[0].password);
        console.log(checkedPass);
        if (checkedPass) {
          MiscHelper.response(res, result, 200);
        }
        MiscHelper.response(res, null, 403, 'Wrong Password!');
      })
      .catch(err => {
        MiscHelper.response(res, err, 400, 'Email not found!');
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