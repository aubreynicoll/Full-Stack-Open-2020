
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB...')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(response => {
    console.log('connected to MongoDB!')    
  })
  .catch(error => {
    console.log('connection to MongoDB failed:', error.message)
  })

  const personSchema = mongoose.Schema({
    name: String,
    number: String
  })
  personSchema.set({
    define: (document, changedObject) => {
      changedObject.id = changedObject._id.toString()
      delete changedObject._id
      delete changedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)