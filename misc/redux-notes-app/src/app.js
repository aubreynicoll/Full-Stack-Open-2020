import React, { useEffect } from 'react'
import NewNoteForm from './components/NewNoteForm'
import NoteFilter from './components/NoteFilter'
import Notes from './components/Notes'
import { useDispatch } from 'react-redux'
import notesService from './services/notesService'
import { initializeNotes } from './reducers/noteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    notesService
      .getAll()
      .then(notes => {
        dispatch(initializeNotes(notes))
      })
  }, [dispatch])

  return (
    <div>
      <NewNoteForm />
      <NoteFilter />
      <Notes />      
    </div>
  )
}

export default App