const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const BookAPI = require('./datasources/BookAPI')
const AuthorAPI = require('./datasources/AuthorAPI')

const bookAPI = new BookAPI()
const authorAPI = new AuthorAPI()

const dataSources = () => {
  return {
    bookAPI,
    authorAPI
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})