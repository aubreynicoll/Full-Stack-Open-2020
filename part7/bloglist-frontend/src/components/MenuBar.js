import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loggedInUserReducer'
import { Link } from 'react-router-dom'

const MenuBar = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link to="/" style={padding}>Blogs</Link>
      <Link to="/users" style={padding}>Users</Link>
      {loggedInUser && <Link to="/create" style={padding}>Create</Link>}
      {loggedInUser
        ? <>
            <em style={padding}>{`logged in as ${loggedInUser.name}`}</em>
            <button onClick={handleLogout}>log out</button>
          </>
        : <Link to="/login" style={padding}>Log in</Link>
      }
    </div>
  )
}

export default MenuBar