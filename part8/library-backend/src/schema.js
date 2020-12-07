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

  type AddBookResponse {
    success: Boolean!
    message: String
    book: Book
  }

  type EditAuthorResponse {
    success: Boolean!
    message: String
    author: Author
  }
`

module.exports = typeDefs