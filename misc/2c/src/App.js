import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
      noteService
        .getAll()
        .then(response => {
          setNotes(response.data)
        })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            //id: notes.length + 1
        }
        noteService
          .create(noteObject)
          .then((response) => {
            setNotes(notes.concat(response.data))
            setNewNote('')
          })

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportance = (id) => {
      console.log(`change importance of note ${id}`)
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const alteredNote = {...note, important: !note.important}

      noteService
        .update(id, alteredNote)
        .then((response) => {
          setNotes(notes.map(n => n.id !== id ? n : response.data))
        })
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) =>
                    <Note
                      key={note.id}
                      note={note}
                      toggleImportance={() => toggleImportance(note.id)} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
