const resolvers = {
  Query: {
    bookCount: (root, args, { dataSources }) => {
      return dataSources.bookAPI.countDocuments()
    },

    authorCount: (root, args, { dataSources }) => {
      return dataSources.authorAPI.countDocuments()
    },

    allBooks: (root, args, { dataSources }) => {
      return dataSources.bookAPI.getAllBooks()
    },

    allAuthors: (root, args, { dataSources }) => {
      return dataSources.authorAPI.getAllAuthors()
    }
  },

  Author: {
    bookCount: (root, args, { dataSources }) => {
      const books = dataSources.bookAPI.getAllBooks()
      const bookCount = books.reduce((acc, book) => book.author === root.name ? acc + 1 : acc, 0)
      return bookCount
    }
  }
}

module.exports = resolvers