import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import CreateAnecdoteForm from './components/CreateAnecdoteForm'

const App = () => {
  return (
    <div>
      <h1>Anecdote App</h1>
      <CreateAnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App