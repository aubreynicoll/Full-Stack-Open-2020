const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    required: true,
    unique: true
  },
  favoriteGenre: {
    type: String
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)