import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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