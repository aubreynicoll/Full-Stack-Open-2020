const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'bad token' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'bad token' })
  }

  const blogToRemove = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)

  if (user._id.toString() !== blogToRemove.user.toString()) {
    return response.status(403).json({ error: 'permission denied' })
  }

  await blogToRemove.remove()
  user.blogs = user.blogs.filter(blog => blog.toString() !== blogToRemove._id.toString())
  await user.save()

  response.status(204).end()
})

module.exports = blogsRouter