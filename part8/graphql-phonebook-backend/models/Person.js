const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)