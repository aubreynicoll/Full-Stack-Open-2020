const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')

beforeEach(async () => {
  await helper.initializeUsers()
  await helper.initializeDb()
})

describe('adding a user...', () => {
  test('without a username fails', async () => {
    const newUser = {
      name: 'buck',
      password: 'butts'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endUsers = await helper.getAllUsers()
    expect(endUsers).toHaveLength(helper.initialUsers.length)
  })

  test('without a password fails', async () => {
    const newUser = {
      name: 'buck',
      username: 'butts'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endUsers = await helper.getAllUsers()
    expect(endUsers).toHaveLength(helper.initialUsers.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})