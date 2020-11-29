const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

console.log(`Connecting to ${config.MONGO_DB_URI}...`)
mongoose.connect(config.MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection successful!')
  })
  .catch(() => {
    console.error('Connecttion failed!')
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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

    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    
    editAuthor(
      name: String!
      setBorn: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    logIn(
      username: String!
      password: String!
    ): Token
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
          return Book.find({ author: author._id, genres: { $in: args.genre } }).populate('author')
        } else {
          return []
        }
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return Book.find({ author: author._id }).populate('author')
        } else {
          return []
        }
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }

      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('You must be logged in to add a book.')
      }
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('You must be logged in to edit an author.')
      }
      let author
      try {
        author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBorn }, { new: true })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return user
    },

    logIn: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== '1234') {
        throw new UserInputError('Incorrect username or password', { invalidArgs: args })
      }
      const unsignedToken = {
        username: user.username,
        id: user._id
      }
      const token = { value: jwt.sign(unsignedToken, config.JWT_SECRET) }
      return token
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const tokenData = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = User.findById(tokenData.id)
      return { currentUser }
    }
  }
})

server
  .listen()
  .then(({ url }) => {
    console.log(`server address: ${url}`)
  })
