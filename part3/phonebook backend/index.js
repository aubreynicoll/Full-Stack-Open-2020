const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Bruce Wayne",
    number: "040-098765",
    id: 2
  },
  {
    name: "Mr. Kobayashi",
    number: "040-456345",
    id: 3
  },
  {
    name: "Brock",
    number: "040-890678",
    id: 4
  },
  {
    name: "Ozzy Osbourne",
    number: "040-123456",
    id: 5
  }
]

const generateId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

app.get('/info', (req, res) => {
  res.send(`the phonebook has ${persons.length} entries\n\n${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
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

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })    
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const port = 3001
app.listen(port, () => {
  console.log(`server listening on port ${port}`)  
})