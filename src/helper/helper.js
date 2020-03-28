const bcrypt = require('bcrypt');
module.exports = {
  response: (res, result, status, err) => {
    let resultPrint = {};
    if (status == 404) {
      resultPrint.status = 'Not Found!';
      resultPrint.statusCode = status;
      resultPrint.result = result;
      resultPrint.err = err || null;
      return res.status(resultPrint.statusCode).json(resultPrint);
    }
    if (status == 400) {
      resultPrint.status = 'Not Allowed!';
      resultPrint.statusCode = status;
      resultPrint.result = result;
      resultPrint.err = err || null;
      return res.status(resultPrint.statusCode).json(resultPrint);
    }
    resultPrint.status = 'Success!';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    return res.status(resultPrint.statusCode).json(resultPrint);
  },
  passwordCheck: (dataLogin) => {
    bcrypt.compare(dataLogin.password);
  }
};