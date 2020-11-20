const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogArray = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogArray.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('api.get(\'/api/blogs\')', () => {
  test('all blogs are returned as JSON', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog.id is defined', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToTest = blogs.body[0]

    expect(blogToTest.id).toBeDefined()
  })
})

describe('api.post(\'/api/blogs\')', () => {
  test('a new blog is created successfully', async () => {
    const newBlog = {
      title: 'star wars, fact?',
      author: 'Leorge Gucas',
      likes: 1,
      url: 'www.buttstothefuture.com'
    }

    const createdBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toContainEqual(createdBlog.body)
  })

  test('missing likes defaults to 0', async () => {
    const newBlog = {
      title: 'star wars, fact?',
      author: 'Leorge Gucas',
      url: 'www.buttstothefuture.com'
    }

    const createdBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(createdBlog.body.likes).toBe(0)
  })

  test('missing title and url throws status 400', async () => {
    const newBlog = {
      likes: 1,
      author: 'todd'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})