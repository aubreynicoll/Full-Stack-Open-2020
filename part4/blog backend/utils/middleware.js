const logger = require('./logger')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  req.token = auth && auth.toLowerCase().startsWith('bearer ')
    ? auth.substring(7)
    : null

  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  errorHandler
}