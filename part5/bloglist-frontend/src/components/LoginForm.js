import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  LoginForm.propTypes = {
    login: PropTypes.func.isRequired
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
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
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: <br />
          <input 
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm