const categoryModel = require('../model/category');
const MiscHelper = require('../helper/helper');
module.exports = {
  getCategory: (req, res) => {
    categoryModel.getCategory()
      .then((result) => {
        MiscHelper.response(res, result, 200);
      });
  }
};