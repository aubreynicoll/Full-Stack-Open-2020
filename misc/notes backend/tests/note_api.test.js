const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


// initialize the DB
beforeEach(async () => {
  await helper.initializeDb()
})


// run the tests
describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const res = await api.get('/api/notes')

    expect(res.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const res = await api.get('/api/notes')

    const contents = res.body.map(r => r.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('viewing a specific note', () => {
  test('a specific note can be viewed', async () => {
    const startNotes = await helper.notesInDb()
    const note = startNotes[0]

    const resultNote = await api
      .get(`/api/notes/${note.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(note)
  })

  test('fails with status 404 if note cannot be found', async () => {
    const wellFormedNonexistantId = await helper.nonexistantId()

    await api
      .get(`/api/notes/${wellFormedNonexistantId}`)
      .expect(404)
  })

  test('fails with status 400 if id is malformed', async () => {
    const malformedId = '1'

    await api
      .get(`/api/notes/${malformedId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endNotes = await helper.notesInDb()
    const contents = endNotes.map(note => note.content)

    expect(endNotes).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('a note without content throws status 400', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const endNotes = await helper.notesInDb()
    expect(endNotes).toHaveLength(helper.initialNotes.length)
  })
})


describe('deletion of a note', () => {
  test('a note can be deleted', async () => {
    const startNotes = await helper.notesInDb()
    const noteToDelete = startNotes[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const endNotes = await helper.notesInDb()
    const contents = endNotes.map(note => note.content)
    expect(endNotes.length).toBe(helper.initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })
})


// close the connection
afterAll(() => {
  mongoose.connection.close()
})