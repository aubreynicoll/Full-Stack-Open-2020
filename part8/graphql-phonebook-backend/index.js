const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Person = require('./models/Person')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

console.log(`connecting to ${config.MONGO_DB_URI}`)

mongoose.connect(config.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connection successful!')
  })
  .catch(error => {
    console.error('connection failed!')
  })

const typeDefs = gql`
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {    
    personCount: Int!

    allPersons(phone: YesNo): [Person!]!

    findPerson(name: String!): Person

    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editPhone(
      name: String!
      phone: String!
    ): Person

    createUser(
      username: String!
    ): User

    logIn(
      username: String!
      password: String!
    ): Token

    addAsFriend(
      username: String!
    ): User
  }
`

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),

    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' } })
    },

    findPerson: (root, args) => Person.findOne({ name: args.name}),

    me: (root, args, context) => context.currentUser
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },

  Mutation: {
    addPerson: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Unauthorized: Log In Required.')
      }
      
      const person = new Person({ ...args })

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person._id)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return person
    },

    editPhone: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone
      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return person
    },

    createUser: async (root, args) => {
      const user = new User({ ... args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return user
    },

    logIn: async (root, args) => {
      const user = await Person.findOne({ username: args.username })

      if (!user || args.password !== '1234') {
        throw new UserInputError('wrong creds, chummer.')
      }

      const unsignedToken = {
        username: user.username,
        id: user._id
      }
      const token = { value: jwt.sign(unsignedToken, config.JWT_SECRET)}
      return token
    },

    addAsFriend: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Unauthorized: Please Log In.')
      }

      const userToAdd = await User.find({ username: args.username })

      if (!currentUser.friends.some(f => f._id === userToAdd._id)) {
        currentUser.friends = currentUser.friends.concat(userToAdd._id)
      }
      await currentUser.save()
      return currentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if ( auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server
  .listen()
  .then(({ url }) => {
    console.log(`server at ${url}`)
  })