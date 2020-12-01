import { useApolloClient, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import CreatePersonForm from './components/CreatePersonForm'
import LogInForm from './components/LogInForm'
import Persons from './components/Persons'
import UpdatePhoneForm from './components/UpdatePhoneForm'
import { ALL_PERSONS } from './queries/index'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div>
      <strong>{message}</strong>
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, { pollInterval: 2000 })
  const client = useApolloClient()

  if (result.loading) {
    return (
      <div>
        'loading...'
      </div>
    )    
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Please Log In:</h2>
        <Notification message={errorMessage} />
        <LogInForm 
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout}>log out</button>
      <Notification message={errorMessage} />
      <CreatePersonForm setError={notify} />
      <UpdatePhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App