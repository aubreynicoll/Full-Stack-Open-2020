require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.log('provide name and number to add an entry, or no args to receive contents')
  process.exit(1)
}

const password = process.env.DB_PASSWORD
const url = `mongodb+srv://fullstack:${password}@cluster0-nqzgg.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  console.log('phonebook:')
  console.log('----------')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}