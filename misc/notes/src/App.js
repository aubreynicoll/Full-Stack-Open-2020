import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes';

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState("OH MY GOD THEY SHOT MARVIN")

    useEffect(() => {
      noteService
        .getAll()
        .then(allNotes => {
          setNotes(allNotes)
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
          .then((createdNote) => {
            setNotes(notes.concat(createdNote))
            setNewNote('')
          })

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportance = (id) => {
      const note = notes.find(n => n.id === id)
      const alteredNote = {...note, important: !note.important}

      noteService
        .update(id, alteredNote)
        .then((updatedNote) => {
          setNotes(notes.map(n => n.id !== id ? n : updatedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification
              message={errorMessage} />
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
            <Footer />
        </div>
    )
}

export default App