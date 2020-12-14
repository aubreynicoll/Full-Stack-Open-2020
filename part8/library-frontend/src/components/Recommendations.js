import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FETCH_ALL_BOOKS, ME } from '../graphql/queries'

const Recommendations = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [bookRecs, setBookRecs] = useState([])
  const result = useQuery(ME, {
    fetchPolicy: 'network-only'
  })
  const [getBookRecs, bookRecsResponse] = useLazyQuery(FETCH_ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setCurrentUser(result.data.me)
      getBookRecs({ variables: { genre: result.data.me.favoriteGenre } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

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