const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')

beforeEach(async () => {
  await helper.initializeDb()
  await helper.initializeUsers()
})

test('user can log in', async () => {
  const creds = {
    username: 'johnd',
    password: 'dragon'
  }

  await api
    .post('/api/login')
    .send(creds)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})