import React from 'react'
import NewNoteForm from './components/NewNoteForm'
import NoteFilter from './components/NoteFilter'
import Notes from './components/Notes'


const App = () => {
  return (
    <div>
      <NewNoteForm />
      <NoteFilter />
      <Notes />      
    </div>
  )
}

export default App