import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/index'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const [getFilteredBooks, filteredBooksResponse] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setGenres([ ...new Set(result.data.allBooks.flatMap(b => b.genres)) ])
    }
  }, [result.data])

  useEffect(() => {
    getFilteredBooks({ variables: { genre: filter } })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (filteredBooksResponse.data) {
      setBooks(filteredBooksResponse.data.allBooks)
    }
  }, [filteredBooksResponse.data])
  
  if (!props.show) {
    return null
  }

  if (result.loading || filteredBooksResponse.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      
      <p>in <strong>{filter ? filter : 'all genres'}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      Filter by genre: <br />
      {genres.map(g => (
        <button key={g} onClick={() => setFilter(g)}>{g}</button>
      ))}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books