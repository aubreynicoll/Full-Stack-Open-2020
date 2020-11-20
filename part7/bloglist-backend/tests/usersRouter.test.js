const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userArray = helper.initialUsers.map(user => new User(user))
  const promiseArray = userArray.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('POST', () => {
  test('new user creation is successful', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'bubsy',
      name: 'bubsy',
      password: 'cat1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    const usernames = usersAtEnd.map(user => user.username)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usernames).toContain(newUser.username)
  })
  test('username is required', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      password: 'butts!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('password must be longer than 3 characters', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'beavis',
      password: 'but'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      password: '3084572930'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})