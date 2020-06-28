const Note = require('../models/note')

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
  const note = new Note({ content: 'n/a' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes,
  initializeDb,
  nonexistantId,
  notesInDb
}