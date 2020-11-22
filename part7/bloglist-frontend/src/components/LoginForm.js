import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../reducers/loggedInUserReducer'
import { setMessage } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  
  const handleSubmit = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''
    event.target.password.value = ''

    try {
      await dispatch(loginUser({ username, password}))
      history.push('/')
    } catch (exception) {
      dispatch(setMessage('Incorrect username or password'))
    }
  }

  return (
    <div>
      <h2>please log in:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username: <br />
          <input 
            type="text"
            name="username"
            id="username-input"
          />
        </div>
        <div>
          password: <br />
          <input 
            type="password"
            name="password"
            id="password-input"
          />
        </div>
        <button type="submit" id="submit-login-button">log in</button>
      </form>
    </div>
  )
}

export default LoginForm