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
    path: "/Books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/Books",
    handler: getAllBookssHandler,
  },
  {
    method: "GET",
    path: `/Books/{id}`,
    handler: getNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: `/Books/{id}`,
    handler: deleteNoteHandler,
  },
  {
    method: "PUT",
    path: `/Books/{id}`,
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
