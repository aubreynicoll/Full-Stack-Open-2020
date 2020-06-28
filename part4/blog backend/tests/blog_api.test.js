const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await helper.initializeDb()
})

test('all blogs are returned as JSON', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is Blog.id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body[0].id).toBeDefined()
})

test('a blog post can be added', async () => {
  const newBlog = new Blog({
    title: '11 Music Blogs You Should Follow in 2019',
    author: 'some dude',
    url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
    likes: 5
  })

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.getAllBlogs()

  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(allBlogs).toContainEqual(res.body)
})

test('missing likes field defaults to 0', async () => {
  const newBlog = new Blog({
    title: '11 Music Blogs You Should Follow in 2019',
    author: 'some dude',
    url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/'
  })

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(res.body.likes).toBeDefined()
  expect(res.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})