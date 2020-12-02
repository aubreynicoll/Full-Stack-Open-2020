import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries/index'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      const booksInStore = store.readQuery({ query: ALL_BOOKS })
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...booksInStore,
          allBooks: [...booksInStore.allBooks, response.data.addBook]
        }
      })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...authorsInStore,
          allAuthors: [...authorsInStore.allAuthors, response.data.addBook.author]
        }
      })
    },
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    
    addBook({ variables: { title, author, published: Number(published), genres } })
    props.notify(`Added ${title}, by ${author}`)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    props.pushBooksView()
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook