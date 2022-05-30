const {
  addBook,
  getAllBookssHandler,
  getBooksByIdHandler,
  editBooksByHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookssHandler,
  },
  {
    method: "GET",
    path: `/books/{id}`,
    handler: getBooksByIdHandler,
  },
  {
    method: "DELETE",
    path: `/books/{id}`,
    handler: deleteBookHandler,
  },
  {
    method: "PUT",
    path: `/books/{id}`,
    handler: editBooksByHandler,
  },
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response("Hello World!");
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return h.response("Halaman Tidak Ditemukan");
    },
  },
];

module.exports = routes;
