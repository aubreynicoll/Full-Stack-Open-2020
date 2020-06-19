// require deps
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

// define middleware functions
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  }

  next(error)
}

// set up express & early middleware
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)


// handle REST methods
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      note
      ? res.json(note)
      : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res) => {      
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content is missing' })
  }
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

// set up late middleware
app.use(unknownEndpoint)
app.use(errorHandler)

// listen
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
