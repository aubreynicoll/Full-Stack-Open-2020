const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): AddBookResponse!

    editAuthor(
      name: String!
      setBorn: Int!
    ): EditAuthorResponse!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  interface Response {
    success: Boolean!
    message: String
  }

  type AddBookResponse implements Response {
    success: Boolean!
    message: String
    book: Book
    author: Author
  }

  type EditAuthorResponse implements Response {
    success: Boolean!
    message: String
    author: Author
  }
`

module.exports = typeDefs