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

test('a note without content is not added', async () => {
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

test('a specific note can be viewed', async () => {
  const startNotes = await helper.notesInDb()
  const note = startNotes[0]

  const resultNote = await api
    .get(`/api/notes/${note.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultNote.body).toEqual(note)
})

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


// close the connection
afterAll(() => {
  mongoose.connection.close()
})