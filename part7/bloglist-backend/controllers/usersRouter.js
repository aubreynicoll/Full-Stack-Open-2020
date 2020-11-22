const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).populate('blogs', { title: 1, url: 1 })
  res.json(user)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password || body.password.length <= 3) {
    return res.status(400).json({ error: 'Password is required and must be 3 characters or longer' })
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name || 'anonymous',
    date: new Date(),
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter