import React, { useState } from 'react'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    addNote({
      content: newNote
    })
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="NewNote"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)} />

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm