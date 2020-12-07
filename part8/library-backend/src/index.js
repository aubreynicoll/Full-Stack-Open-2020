const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const BookAPI = require('./datasources/BookAPI')
const AuthorAPI = require('./datasources/AuthorAPI')

const dataSources = () => ({
  bookAPI: new BookAPI(),
  authorAPI: new AuthorAPI()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})