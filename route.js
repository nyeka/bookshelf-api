const {
  addBook,
  getAllBookssHandler,
  getNoteByIdHandler,
  deleteNoteHandler,
  editNoteByHandler,
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
    handler: getNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: `/books/{id}`,
    handler: deleteNoteHandler,
  },
  {
    method: "PUT",
    path: `/books/{id}`,
    handler: editNoteByHandler,
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
