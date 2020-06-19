require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

const app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())


const generateId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.get('/info', (req, res) => {
  res.send(`the phonebook has ${persons.length} entries\n\n${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  person
  ? res.json(person)
  : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })    
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })    
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(newPerson => {
    res.json(newPerson)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server listening on port ${port}`)  
})