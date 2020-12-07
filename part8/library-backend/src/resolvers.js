const resolvers = {
  Query: {
    bookCount: (root, args, { dataSources }) => {
      return dataSources.bookAPI.countDocuments()
    },

    authorCount: (root, args, { dataSources }) => {
      return dataSources.authorAPI.countDocuments()
    },

    allBooks: (root, args, { dataSources }) => {
      const books = dataSources.bookAPI.getAllBooks()
      if (args.author && args.genre) {
        return books
          .filter(b => (
            b.author === args.author && 
            b.genres.includes(args.genre)
          ))
      }
      if (args.author) {
        return books.filter(b => b.author === args.author)
      }
      if (args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },

    allAuthors: (root, args, { dataSources }) => {
      return dataSources.authorAPI.getAllAuthors()
    }
  },

  Mutation: {
    addBook: (root, args, { dataSources }) => {
      const author = dataSources.authorAPI.createNewAuthor({ authorData: { name: args.author } })
      const book = dataSources.bookAPI.createNewBook({ bookData: { ...args } })

      const success = dataSources.authorAPI.getAllAuthors().some(a => a.id === author.id) &&
        dataSources.bookAPI.getAllBooks().some(b => b.id === book.id)
      
      const message = success
        ? `${book.title} was created successfully!`
        : 'book creation failed'

      return {
        success,
        message,
        book: success ? book : null
      }
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