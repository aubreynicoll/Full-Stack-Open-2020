import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_AUTHOR } from '../graphql/mutations'
import Select from 'react-select'

const UpdateAuthorBornForm = ({ allAuthors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const selectOptions = allAuthors.map(author => ({ value: author.name, label: author.name }))

  const onSubmit = (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name,
        setBorn: Number(born)
      }
    })
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Author name: <br />
          <Select
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={selectOptions}
          />
        </div>
        <div>
          Author born: <br />
          <input type="number" value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default UpdateAuthorBornForm