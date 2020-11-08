import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={login}>
        <div>
          username: 
          <input 
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>

        <div>
          password: 
          <input 
            type="text"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>

        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm