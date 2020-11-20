require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT

let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_URI
}

const SECRET = process.env.SECRET

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  SECRET
}