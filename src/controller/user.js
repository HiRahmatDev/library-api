const userModel = require('../model/user');
const MiscHelper = require('../helper/helper');
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
        MiscHelper.response(res, result,200);
      })
      .catch(err => res.send(err));
  },
  insertUser: (req, res) => {
    const {card_number, email, fullname, password, salt, token, phone, role_id, photo, status} = req.body;
    const data = {card_number, email, fullname, password, salt, token, phone, role_id, photo, status};
    userModel.insertUser(data)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  updateUser: (req, res) => {
    const idUser = req.params.idUser;
    const {card_number, email, fullname, password, salt, token, phone, role_id, photo, status} = req.body;
    const data = {card_number, email, fullname, password, salt, token, phone, role_id, photo, status};
    userModel.updateUser(data, idUser)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  }
};

module.exports = userController;