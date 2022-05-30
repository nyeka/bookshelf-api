const { response } = require("@hapi/hapi/lib/validation");
const { nanoid } = require("nanoid");
const books = require("./data");

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;
  const finished = pageCount === readPage;

  const NewBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    createdAt,
    updateAt,
  };

  const isSuccess = books.filter((n) => n.id !== id).length > 0;

  if (isSuccess && name.length > 0 && pageCount > readPage) {
    books.push(NewBook);
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else if (name.length === 0) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  books.push(NewBook);

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBookssHandler = () => ({
  status: "success",
  data: {
    books: books.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    }),
  },
});

const deleteNoteHandler = (req, h) => {
  const { id } = req.params;

  const index = books.findIndex((note) => note.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
const editNoteByHandler = (req, h) => {
  const { id } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const updateAt = new Date().toISOString();

  const index = books.findIndex((note) => note.id === id);

  if (index !== -1 && name.length > 0 && pageCount > readPage) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  } else if (name.length === 0) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const buku = books.filter((n) => n.id === id)[0];

  if (buku !== undefined) {
    return {
      status: "success",
      data: {
        buku,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBookssHandler,
  getNoteByIdHandler,
  deleteNoteHandler,
  editNoteByHandler,
};
