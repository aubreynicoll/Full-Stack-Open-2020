let { books, authors } = require('../datasources/store')
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if ( args.author && args.genre) {
        return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      }
      if (args.author) {
        return books.filter(book => book.author === args.author)
      }
      if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => authors
  },

  Mutation: {
    addBook: (root, args) => {
      if (!authors.some(author => author.name === args.author)) {
        const newAuthor = {
          name: args.author,
          born: null,
          id: uuid()
        }
        authors = [...authors, newAuthor]
      }
      const newBook = { ...args, id: uuid() }
      books = [...books, newBook]
      return newBook
    },

    editAuthor: (root, args) => {
      const existingAuthor = authors.find(author => author.name === args.name)

      if (!existingAuthor) return null

      const updatedAuthor = {
        ...existingAuthor,
        born: args.setBorn
      }

      authors.map(author => author.id === updatedAuthor.id ? updatedAuthor : author)
      return updatedAuthor
    }
  },

  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  }
}

module.exports = resolvers