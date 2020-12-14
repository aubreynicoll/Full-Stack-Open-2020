let { books, authors } = require('../datasources/store')
const Book = require('../models/Book')
const Author = require('../models/Author')
const { UserInputError, AuthenticationError } = require('apollo-server')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.author })
      if (args.author && args.genre) {
        return Book.find({ author: existingAuthor, genres: { $in: args.genre } }).populate('author')
      }
      if (args.author) {
        return Book.find({ author: existingAuthor }).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('You must be logged in.')

      try {
        let savedAuthor = await Author.findOne({ name: args.author })

        if (!savedAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null
          })

          savedAuthor = await newAuthor.save()
        }

        const newBook = new Book({
          ...args,
          author: savedAuthor
        })

        return newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }      
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('You must be logged in.')
      try {
        return Author.findOneAndUpdate({ name: args.name }, { born: args.setBorn }, { new: true })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }      
    },

    createUser: async (root, args) => {
      try {
        const newUser = new User({
          ...args
        })
        return newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '1234') {
        throw new UserInputError('wrong credentials')
      }
      const unsignedToken = { 
        username: user.username,
        id: user._id }
      const signedToken = jwt.sign(unsignedToken, JWT_SECRET)
      return { value: signedToken }
    }
  },

  Author: {
    bookCount: (root) => Book.find({ author: root }).countDocuments()
  }
}

module.exports = resolvers