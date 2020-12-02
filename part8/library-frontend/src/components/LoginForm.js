import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/index'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token  = result.data.login.value
      localStorage.setItem('currentUserToken', token)
      props.setToken(token)
      props.pushHome()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const onSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password }})
    setUsername('')
    setPassword('')
  }

  if (!props.show) {
    return null
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

export default LoginForm