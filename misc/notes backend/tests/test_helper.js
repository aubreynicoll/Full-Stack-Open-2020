const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    important: true
  }
]

const initializeDb = async () => {
  await Note.deleteMany({})

  const notes = initialNotes.map(note => new Note(note))
  const promises = notes.map(note => note.save())

  await Promise.all(promises)
}

const nonexistantId = async () => {
  const note = new Note({ content: 'fake ass note' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const fetchAllUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  initializeDb,
  nonexistantId,
  notesInDb,
  fetchAllUsers
}