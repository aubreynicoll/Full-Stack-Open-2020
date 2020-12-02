
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('currentUserToken')
    if (token) {
      setToken(token)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    localStorage.removeItem('currentUserToken')
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>log out</button>}
        {!token && <button onClick={() => setPage('login')}>log in</button>}
      </div>
      <div>
        <Notification errorMessage={errorMessage} />
      </div>

      <Authors
        show={page === 'authors'}
        notify={notify}
      />

      <Books
        show={page === 'books'}        
      />

      <NewBook
        show={page === 'add'}
        notify={notify}
        pushBooksView={() => setPage('books')}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        notify={notify}
        pushHome={() => setPage('authors')}
      />

      <Recommendations
        show={page ==='recommendations'}
      />

    </div>
  )
}

export default App