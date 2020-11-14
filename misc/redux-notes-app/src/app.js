import React, { useEffect } from 'react'
import NewNoteForm from './components/NewNoteForm'
import NoteFilter from './components/NoteFilter'
import Notes from './components/Notes'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
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