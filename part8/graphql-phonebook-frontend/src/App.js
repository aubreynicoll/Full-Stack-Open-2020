import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import CreatePersonForm from './components/CreatePersonForm'
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
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, { pollInterval: 2000 })

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

  return (
    <div>
      <Notification message={errorMessage} />
      <CreatePersonForm setError={notify} />
      <UpdatePhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App