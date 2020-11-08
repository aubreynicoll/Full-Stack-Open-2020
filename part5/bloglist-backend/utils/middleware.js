const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    res.status(400).json({ error: 'fuck' })
  }
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}