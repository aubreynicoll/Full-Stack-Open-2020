import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loggedInUserReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'

const MenuBar = () => {
  const currentUser = useSelector(state => state.loggedInUser)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setMessage('Logged out successfully!', true))
  }

  const padding = {
    padding: 20
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>

        {currentUser && <Button color="inherit" component={Link} to="/create">
            Create
          </Button>
        }

        {currentUser
          ? <>
              <em style={padding}>{`logged in as ${currentUser.name}`}</em>
              <Button variant="contained" color="default" onClick={handleLogout}>log out</Button>
            </>
          : <>
              <Button color="inherit" component={Link} to="/login">
                log in
              </Button>
            </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar