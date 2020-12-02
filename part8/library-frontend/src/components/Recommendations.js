import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries/index'

const Recommendations = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [bookRecs, setBookRecs] = useState([])
  const result = useQuery(CURRENT_USER)
  const [getBookRecs, bookRecsResponse] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data && result.data.me) {
      setCurrentUser(result.data.me)
      getBookRecs({ variables: { genre: result.data.me.favoriteGenre } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  useEffect(() => {
    if (bookRecsResponse.data) {
      setBookRecs(bookRecsResponse.data.allBooks)
    }
  }, [bookRecsResponse.data])



  if (!props.show || !currentUser) {
    return null
  }

  if (result.loading || bookRecsResponse.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>Books in your favorite genre <strong>{currentUser.favoriteGenre}</strong></p>

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
          {bookRecs
            .map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations