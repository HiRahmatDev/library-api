module.exports = {
  response: (res, result, status, err) => {
    let resultPrint = {};
    resultPrint.status = 'Berhasil!';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    return res.status(resultPrint.statusCode).json(resultPrint);
  }
}