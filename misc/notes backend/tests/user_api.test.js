const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially one user...', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('1234', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const startUsers = await helper.fetchAllUsers()

    const newUser = {
      username: 'anicoll',
      name: 'aubrey nicoll',
      password: 'Goku>9000'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endUsers = await helper.fetchAllUsers()
    const usernames = endUsers.map(body => body.username)

    expect(endUsers).toHaveLength(startUsers.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const startUsers = await helper.fetchAllUsers()

    const newUser = {
      username: 'root',
      name: 'Goku',
      password: 'I<3Vegeta'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const endUsers = await helper.fetchAllUsers()

    expect(result.body.error).toContain('expected `username` to be unique')
    expect(endUsers).toHaveLength(startUsers.length)
  })
})