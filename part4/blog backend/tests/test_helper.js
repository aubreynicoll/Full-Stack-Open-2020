const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'goku',
    password: '>9000'
  },
  {
    username: 'johnd',
    name: 'john doe',
    password: 'dragon'
  }
]

const initializeBlogs = async () => {
  await Blog.deleteMany({})
  const user = await User.findOne({ username: 'johnd' })

  const promises = initialBlogs.map(async blog => {
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
      user: user._id,
      _id: blog._id
    })

    return newBlog.save()
  })

  await Promise.all(promises)
}

const initializeUsers = async () => {
  await User.deleteMany({})

  const promises = initialUsers.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10)

    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash
    })

    return newUser.save()
  })

  await Promise.all(promises)
}

const getAllBlogs = async () => {
  const allBlogs = await Blog.find({})
  return allBlogs.map(blog => blog.toJSON())
}

const getAllUsers = async () => {
  const allUsers = await User.find({})
  return allUsers.map(user => user.toJSON())
}

const getToken = async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'johnd', password: 'dragon' })

  return login.body.token
}

module.exports = {
  initialBlogs,
  initialUsers,
  initializeDb: initializeBlogs,
  initializeUsers,
  getAllBlogs,
  getAllUsers,
  getToken
}