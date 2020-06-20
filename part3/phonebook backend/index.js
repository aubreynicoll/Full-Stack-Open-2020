// require deps
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// define middleware data
morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

// define middleware functions
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformed id' })
  }
  else if (error.name === 'ValidationError') {
    res.status(400).send({ error: error.message })
  }

  next(error)
}

// set up express & early middleware
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// handle REST methods
app.get('/info', (req, res) => {
  Person.count({}, (err, count) => {
    res.send(`the phonebook has ${count} entries\n\n${new Date()}`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person
      ? res.json(person)
      : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(newPerson => {
      res.json(newPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
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