const resolvers = {
  Query: {
    bookCount: (root, args, { dataSources }) => (
      dataSources.bookAPI.countDocuments()
    ),
    authorCount: (root, args, { dataSources }) => (
      dataSources.authorAPI.countDocuments()
    )
  }
}

module.exports = resolvers