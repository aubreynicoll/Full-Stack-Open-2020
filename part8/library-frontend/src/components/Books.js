import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { FETCH_ALL_BOOKS, FETCH_ALL_BOOKS_GENRES } from '../graphql/queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)

  const allBooks = useQuery(FETCH_ALL_BOOKS)
  const [fetchFilteredBooks, filteredBooksResponse] = useLazyQuery(FETCH_ALL_BOOKS, { 
    variables: { genre: filter },
    onCompleted: ({ allBooks }) => {
      setBooks(allBooks)
    }
  })

  useEffect(() => {
    if (allBooks.data){
      setBooks(allBooks.data.allBooks)
      setGenres(
        [ ...new Set( allBooks.data.allBooks.flatMap(book => book.genres) ) ]
      )
    }
  }, [allBooks.data])

  useEffect(() => {
    fetchFilteredBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  if (!props.show) {
    return null
  }
  
  if (allBooks.loading || filteredBooksResponse.loading) return (<div>loading...</div>)
  if (allBooks.error || filteredBooksResponse.error) return (<div>ERROR</div>)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books