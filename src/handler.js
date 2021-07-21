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
  const { name, reading, finished } = request.query
  let filteredBooks = Library

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(book => Number(reading) === Number(book.reading))
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(book => Number(finished) === Number(book.finished))
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response


}

const getBookById = (request, h) => {
  const { bookId } = request.params
  const book = Library.filter((n) => n.id === bookId)[0]

  if (book !== undefined) {
    const response = h.response
      ({
        status: "success",
        data: {
          book
        }
      })
    response.code(200)
    return response
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan"
  })
    .code(404)
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
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    }
    const response = h.response({
      status: 'success',
      message: "Buku berhasil diperbarui",
    })
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  })
  response.code(404);
  return response;

};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = Library.findIndex((book) => book.id === bookId)

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
