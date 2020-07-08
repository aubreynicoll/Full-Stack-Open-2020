import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes';
import loginService from './services/login'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
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

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        noteService.setToken(user.token)
        setUser(user)
        
        setUsername('')
        setPassword('')
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

    const loginForm = () => {
      return (
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />                
          </div>
          <div>
            password:
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      )
    }

    const noteForm = () => {
      return (
        <div>
          <p>
            currently logged in as {user.name}
            <button type="button" onClick={handleLogout}>logout</button>
          </p>
          <form onSubmit={addNote}>          
            <input
                value={newNote}
                onChange={handleNoteChange} />
            <button type="submit">save</button>
          </form>
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
                ? loginForm()
                : noteForm()
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
