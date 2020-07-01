const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.password || body.password.length < 3) {
    return next({
      name: 'ValidationError',
      message: 'password is required and must be at least 3 characters long'
    })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter