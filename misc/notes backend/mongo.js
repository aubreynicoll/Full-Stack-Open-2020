require('dotenv').config()
const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('provide the password as an argument: node index.js <password>')
//   process.exit(1)
// }

const password = process.env.DB_PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0-nqzgg.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})