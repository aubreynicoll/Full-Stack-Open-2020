import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h1>Anecdote App</h1>
      <Notification />
      <CreateAnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App