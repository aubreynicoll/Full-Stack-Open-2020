import React, {useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes';
import loginService from './services/login'
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
    const [notes, setNotes] = useState([])    
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    const addNote = (noteObject) => {
      noteFormRef.current.toggleVisibility()
      noteService
        .create(noteObject)
        .then((createdNote) => {
          setNotes(notes.concat(createdNote))
        })
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

    const handleLogin = async (username, password) => {
      try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        noteService.setToken(user.token)
        setUser(user)
      }
      catch (exception) {
        setErrorMessage('incorrect credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    const handleLogout = (event) => {
      window.localStorage.removeItem('loggedInUser')
      noteService.setToken(null)
      setUser(null)
    }

    const showLoginForm = () => {
      return (
        <div>
          <Togglable buttonLabel="login">
            <LoginForm              
              handleLogin={handleLogin} />
          </Togglable>
        </div>
      )
    }

    const showNoteForm = () => {
      return (
        <div>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm 
              addNote={addNote} />
          </Togglable>
        </div>
      )
    }

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important)

    useEffect(() => {
      noteService
        .getAll()
        .then(allNotes => {
          setNotes(allNotes)
        })
    }, [])

    useEffect(() => {
      const loggedInUser = window.localStorage.getItem('loggedInUser')

      if (loggedInUser) {
        const user = JSON.parse(loggedInUser)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, [])

    return (
        <div>
            <h1>Notes</h1>            

            <Notification
              message={errorMessage} />

              {user === null
                ? showLoginForm()
                : showNoteForm()
              }

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

            <Footer />
        </div>
    )
}

export default App
