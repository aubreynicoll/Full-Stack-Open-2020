import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NEW_BOOK } from '../graphql/mutations'
import { FETCH_ALL_AUTHORS, FETCH_ALL_BOOKS } from '../graphql/queries'

const NewBook = (props) => {
  const [addNewBook] = useMutation(ADD_NEW_BOOK, {
    update: (cache, { data: { addBook } }) => {
      if (addBook.success && addBook.author) {
        const authorsInCache = cache.readQuery({ query: FETCH_ALL_AUTHORS })
        authorsInCache && cache.writeQuery({
          query: FETCH_ALL_AUTHORS,
          data: {
            allAuthors: authorsInCache.allAuthors.concat(addBook.author)
          }
        })
      }
      if (addBook.success && addBook.book) {
        const booksInCache = cache.readQuery({ query: FETCH_ALL_BOOKS })
        booksInCache && cache.writeQuery({
          query: FETCH_ALL_BOOKS,
          data: {
            allBooks: booksInCache.allBooks.concat(addBook.book)
          }
        })
      }
    }
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    
    addNewBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
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