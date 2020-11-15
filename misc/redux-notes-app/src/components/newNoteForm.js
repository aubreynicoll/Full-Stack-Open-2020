import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
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

const mapDispatchToProps = {
  createNote
}

export default connect(null, mapDispatchToProps)(NewNoteForm)