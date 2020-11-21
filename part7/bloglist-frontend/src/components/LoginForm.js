import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loggedInUserReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password}))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>please log in:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username: <br />
          <input 
            type="text"
            id="username-input"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: <br />
          <input 
            type="password"
            id="password-input"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="submit-login-button">log in</button>
      </form>
    </div>
  )
}

export default LoginForm