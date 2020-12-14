const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  published: {
    type: Number,
    required: true
  },
  genres: [
    {
      type: String
    }
  ]
})

bookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', bookSchema)