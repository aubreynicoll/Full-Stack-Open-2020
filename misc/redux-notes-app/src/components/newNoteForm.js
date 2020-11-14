import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import notesService from '../services/notesService'

const NewNoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const note = await notesService.createNew(content)
    dispatch(createNote(note))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">create note</button>
      </form>
    </div>
  )
}

export default NewNoteForm