import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../reducers/loggedInUserReducer'
import { setMessage } from '../reducers/notificationReducer'
import { TextField, Button } from '@material-ui/core'

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
      await dispatch(loginUser({ username, password }))
      dispatch(setMessage('Login successful!', true))
      history.push('/')
    } catch (e) {
      dispatch(setMessage('Incorrect username or password.', false))
    }
  }

  return (
    <div>
      <h2>please log in:</h2>
      <form onSubmit={handleSubmit}>
        <div>          
          <TextField label="username" name="username" />
        </div>
        <div>
          <TextField label="password" name="password" type="password" />
        </div>
        <Button type="submit" variant="contained" color="primary">log in</Button>
      </form>
    </div>
  )
}

export default LoginForm