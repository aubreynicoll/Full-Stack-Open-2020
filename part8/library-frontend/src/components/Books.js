import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/index'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    setGenres([ ...new Set(books.flatMap(b => b.genres)) ])
  }, [books])
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
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
            .filter(b => filter ? b.genres.includes(filter) : true)
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