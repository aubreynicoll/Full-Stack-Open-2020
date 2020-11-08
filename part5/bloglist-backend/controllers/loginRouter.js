const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: 'incorrect username or password' })
  }

  const token = {
    username: user.username,
    id: user._id
  }
  const signedToken = jwt.sign(token, config.SECRET)

  res.status(200).json({ token: signedToken, username: user.username, name: user.name })
})

module.exports = loginRouter