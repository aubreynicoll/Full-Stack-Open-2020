const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
  }
`

module.exports = typeDefs