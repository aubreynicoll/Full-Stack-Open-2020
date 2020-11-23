const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res) => {
  const results = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.status(200).json(results)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const verifiedToken = jwt.verify(token, config.SECRET)

  if (!token || !verifiedToken.id) {
    return res.status(401).json({ error: 'missing or invalid token' })
  }

  const user = await User.findById(verifiedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author || 'anonymous',
    url: body.url,
    likes: body.likes || 0,
    date: new Date(),
    user: user._id
  })

  const savedBlog = await blog.save().then(blog => blog.populate('user', { username: 1, name: 1 }).execPopulate())
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const id = req.params.id
  const comment = req.body.comment

  const updatedBlog = await Blog.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true }).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    res.status(200).json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const verifiedToken = jwt.verify(token, config.SECRET)

  if (!token || !verifiedToken.id) {
    return res.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(req.params.id)
  const user = await User.findById(verifiedToken.id)

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'unauthorized user: blog may only be removed by its creator' })
  }
  await blog.remove()
  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString())
  await user.save()

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    res.status(200).json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter