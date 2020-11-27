import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_PERSONS, CREATE_PERSON } from '../queries/index'

const CreatePersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, { 
    refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, street, city, phone } })

    setName('')
    setStreet('')
    setCity('')
    setPhone('')
  }

  return (
    <div>
      <h2>Add Person:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <br />
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          street: <br />
          <input value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          city: <br />
          <input value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <div>
          phone: <br />
          <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default CreatePersonForm