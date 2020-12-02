import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/index'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorBornForm = ({ authors, notify }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    update: (store, response) => {
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...authorsInStore,
          allAuthors: authorsInStore.allAuthors.map(a => a.id === response.data.editAuthor.id ? response.data.editAuthor : a)
        }
      })
    },
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const onSubmit = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: {
        name,
        setBorn: Number(born)
      }
    })

    notify(`Set ${name}'s birthdate to ${born}`)

    setName(null)
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <br />
          <Select
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={options}
          />
        </div>
        <div>
          born: <br />
          <input type="number" value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AuthorBornForm