const { nanoid } = require('nanoid')
const Library = require('./library')

const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const book = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
  }

  if (!request.payload.name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    })
    response.code(400)
    return response

  } else if (request.payload.readPage > request.payload.pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
    response.code(400)
    return response

  } else if (Library.push(book)) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  } else {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan"
    })
    response.code(500)
    return response
  }
};

const getAllBook = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: [
        {
          id: Library.id,
          name: Library.name,
          publisher: Library.publisher
        }
      ]
    }
  })
  response.code(200)
  return response
}

const getBookById = (request, h) => {
  const { id } = request.params

  const book = Library.filter((n) => n.id === id)[0]

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        books: [
          {
            book: book
          }
        ]
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: "error",
    data: {
      books: []
    }
  })
  response.code(404)
  return response
}

const editBookById = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const updatedAt = new Date().toISOString()
  const index = Library.findIndex((book) => book.id == bookId)

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    })
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    })
    response.code(400);
    return response;
  }

  if (index !== -1) {
    Library[index] = {
      ...Library[index],
      name, year, author, summary, pageCount, readPage, reading, updatedAt
    }
    const response = h.response({
      status: 'fail',
      message: "Buku berhasil diperbarui",
    })
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: "Buku berhasil diperbarui",
  })
  response.code(404);
  return response;

};

const deleteBookById = (request, h) => {
  const { id } = request.params;

  const index = Library.findIndex((book) => book.id === id)

  if (index !== -1) {
    Library.splice(index, 1)
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus"
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = {
  addBook,
  getAllBook,
  getBookById,
  editBookById,
  deleteBookById,
}
