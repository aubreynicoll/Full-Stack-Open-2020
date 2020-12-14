import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    userToken && setToken(userToken)
  }, [])

  const handleLogout = () => {
    client.cache.evict({ id: 'ROOT_MUTATION' })
    client.cache.evict({ id: 'ROOT_QUERY', fieldName: 'me' })
    client.cache.gc()

    localStorage.removeItem('userToken')

    setToken(null)
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={handleLogout}>log out</button>}
        {!token && <button onClick={() => setPage('login')}>log in</button>}        
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />

    </div>
  )
}

export default App