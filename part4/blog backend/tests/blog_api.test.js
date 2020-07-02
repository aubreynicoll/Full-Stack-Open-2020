const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


beforeEach(async () => {
  await helper.initializeDb()
  await helper.initializeUsers()
})

describe('http GET', () => {
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
})

describe('http POST', () => {
  test('a blog post can be added', async () => {
    const newBlog = {
      title: '11 Music Blogs You Should Follow in 2019',
      author: 'some dude',
      url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
      likes: 5
    }
    const token = await helper.getToken()

    const res = await api
      .post('/api/blogs')
      .set({ authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.getAllBlogs()
    const titles = allBlogs.map(blog => blog.title)

    expect(titles).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(res.body.title)
  })

  test('missing likes field defaults to 0', async () => {
    const newBlog = {
      title: '11 Music Blogs You Should Follow in 2019',
      author: 'some dude',
      url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/'
    }
    const token = await helper.getToken()

    const res = await api
      .post('/api/blogs')
      .set({ authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBeDefined()
    expect(res.body.likes).toBe(0)
  })

  test('missing title and url throws status 400 error', async () => {
    const newBlog = {
      author: 'some dude',
      likes: 9001
    }
    const token = await helper.getToken()

    await api
      .post('/api/blogs')
      .set({ authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('missing token throws 401', async () => {
    const newBlog = {
      title: '11 Music Blogs You Should Follow in 2019',
      author: 'some dude',
      url: 'https://www.mi.edu/in-the-know/11-music-blogs-follow-2019/',
      likes: 5
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.getAllBlogs()

    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('http PUT', () => {
  test('updating blog.likes is successful', async () => {
    const startBlogs = await helper.getAllBlogs()
    const noteToUpdate = startBlogs[0]

    const newNote = {
      ...noteToUpdate,
      likes: noteToUpdate.likes++
    }

    const updatedNote = await api
      .put(`/api/blogs/${noteToUpdate.id}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedNote.body).toEqual(newNote)
  })
})

describe('http DELETE', () => {
  test('a request with valid id is completed successfully', async () => {
    const startBlogs = await helper.getAllBlogs()
    const noteToDelete = startBlogs[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const endBlogs = await helper.getAllBlogs()
    const titles = endBlogs.map(blog => blog.title)
    expect(endBlogs.length).toBe(helper.initialBlogs.length - 1)
    expect(titles).not.toContain(noteToDelete.content)
  })
})


afterAll(() => {
  mongoose.connection.close()
})