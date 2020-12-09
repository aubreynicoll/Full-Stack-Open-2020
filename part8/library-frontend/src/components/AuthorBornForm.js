import React, { useState } from 'react'
import { useInput } from '../hooks/index'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR_BORN } from '../graphql/mutations'
import { FETCH_ALL_AUTHORS } from '../graphql/queries'
import Select from 'react-select'

const AuthorBornForm = ({ allAuthors }) => {
  const [authorName, setAuthorName] = useState(null)
  const authorSetborn = useInput('number')

  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
    update: (cache, { data: { editAuthor }}) => {
      const authorsInCache = cache.readQuery({ query: FETCH_ALL_AUTHORS })
      authorsInCache && cache.writeQuery({
        query: FETCH_ALL_AUTHORS,
        data: {
          allAuthors: authorsInCache.allAuthors.map(a => (
            a.id === editAuthor.author.id 
              ? editAuthor.author 
              : a
          ))
        }
      })
    }
  })

  const selectOptions = allAuthors.map(a => ({ value: a.name, label: a.name }))

  const onSubmit = (event) => {
    event.preventDefault()
    
    updateAuthorBorn({
      variables: {
        name: authorName,
        setBorn: Number(authorSetborn.value)
      }
    })

    authorSetborn.reset()
  }

  return (
    <div>
      <h2>Update Author Birthyear:</h2>
      <form onSubmit={onSubmit}>
        <div>
          Author name: <br />
          <Select
            defaultValue={authorName}
            onChange={({ value }) => setAuthorName(value)}
            options={selectOptions}
          />
        </div>
        <div>
          Author birthyear: <br />
          <input {...authorSetborn.props} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AuthorBornForm