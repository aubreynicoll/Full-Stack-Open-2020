// require deps
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const Note = require('./models/note')
const { response } = require('express')

// set up express & middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)

const generateId = () => {
  const maxId = notes.length > 0 
  ? Math.max(...notes.map(n => n.id)) 
  : 0

  return maxId + 1
}

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(n => n.id !== id)

  res.status(204).end()
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
    ...body,
    important: body.important
  }
  notes = notes.map(n => n.id !== note.id ? n : note)

  res.send(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
