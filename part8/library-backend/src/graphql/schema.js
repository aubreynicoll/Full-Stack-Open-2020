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
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBorn: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User!

    login(
      username: String!
      password: String!
    ): Token
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!    
  }

  type Token {
    value: String!
  }
`

module.exports = typeDefs