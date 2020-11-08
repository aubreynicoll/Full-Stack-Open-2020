require('dotenv').config()

let NODE_ENV = process.env.NODE_ENV
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

module.exports = {
  NODE_ENV,
  PORT,
  MONGODB_URI
}