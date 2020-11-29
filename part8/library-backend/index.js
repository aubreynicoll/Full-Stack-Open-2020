const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/Book')
const Author = require('./models/Author')

console.log(`Connecting to ${config.MONGO_DB_URI}...`)
mongoose.connect(config.MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection successful!')
  })
  .catch(() => {
    console.error('Connecttion failed!')
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!

    authorCount: Int!

    allBooks(
      author: String
      genre: String
    ): [Book!]

    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    
    editAuthor(
      name: String!
      setBorn: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return Book.find({ author: author._id, genres: { $in: args.genre } })
        } else {
          return []
        }
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return Book.find({ author: author._id })
        } else {
          return []
        }
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } })
      }

      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author })
      return book.save()
    },

    editAuthor: async (root, args) => {
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBorn }, { new: true })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) => {
    console.log(`server address: ${url}`)
  })
