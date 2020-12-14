import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN } from '../graphql/mutations'
import { ME } from '../graphql/queries'

const LoginForm = ({ setPage, setToken, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: { value } }) => {
      const token = `bearer ${value}`
      localStorage.setItem('userToken', token)
      setToken(token)
      setPage('authors')
    }
  })

  const onSubmit = (event) => {
    event.preventDefault()

    login({
      variables: {
        username,
        password
      }
    })

    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          username: <br />
          <input value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: <br />
          <input type="password" value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default LoginForm