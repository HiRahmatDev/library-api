const bookModel = require('../model/book');
const MiscHelper = require('../helper/helper');
const bookController = {
  getBooks: (req, res) => {
    const {search, sort, page, limit} = req.query;
    bookModel.getBooks(search, sort, page, limit)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        MiscHelper.response(res, err, 400);
      });
  },
  bookDetail: (req, res) => {
    const idBook = req.params.idBook;
    bookModel.bookDetail(idBook)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => res.send(err));
  },
  insertBook: (req, res) => {
    const { title, description, author, img, status, id_category } = req.body;
    const data = { title, description, author, img, status, id_category };
    bookModel.insertBook(data)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  updateBook: (req, res) => {
    const idBook = req.params.idBook;
    const { title, description, author, img, status, id_category } = req.body;
    const data = { title, description, author, img, status, id_category };
    bookModel.updateBook(data, idBook)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  deleteBook: (req, res) => {
    const idBook = req.params.idBook;
    bookModel.deleteBook(idBook)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  },
  loanBook: (req, res) => {
    bookModel.loanBook(req.query.book)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  }
};

module.exports = bookController;