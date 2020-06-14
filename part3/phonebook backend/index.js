const express = require('express')
const app = express()

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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const port = 3001
app.listen(port, () => {
  console.log(`server listening on port ${port}`)  
})