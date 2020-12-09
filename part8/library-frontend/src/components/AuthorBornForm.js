import React from 'react'
import { useInput } from '../hooks/index'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR_BORN } from '../graphql/mutations'
import { FETCH_ALL_AUTHORS } from '../graphql/queries'

const AuthorBornForm = () => {
  const authorName = useInput('text')
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

  const onSubmit = (event) => {
    event.preventDefault()
    
    updateAuthorBorn({
      variables: {
        name: authorName.value,
        setBorn: Number(authorSetborn.value)
      }
    })

    authorName.reset()
    authorSetborn.reset()
  }

  return (
    <div>
      <h2>Update Author Birthyear:</h2>
      <form onSubmit={onSubmit}>
        <div>
          Author name: <br />
          <input {...authorName.props} />
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