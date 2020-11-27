import React, { useState } from 'react'
import { UPDATE_AUTHOR } from '../queries/index'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorBornForm = ({ authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR)
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const onSubmit = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: {
        name,
        setBorn: Number(born)
      }
    })

    setName('')
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
          <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AuthorBornForm