const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

console.log('Connecting to MongoDB...')
mongoose.connect(config.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connection to MongoDB is successful!')
  })
  .catch(error => {
    console.error('Connection to MongoDB failed!', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const verifiedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(verifiedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})