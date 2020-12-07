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
    }
  }
}

module.exports = resolvers