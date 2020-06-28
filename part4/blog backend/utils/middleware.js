const logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  console.log('Made it to the error handler!!!')
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  errorHandler
}