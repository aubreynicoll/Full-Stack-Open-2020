import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/index'

const LogInForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [logIn, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('currentUserToken', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const onSubmit = (event) => {
    event.preventDefault()
    logIn({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Username: <br />
          <input value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: <br />
          <input type="password" value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LogInForm