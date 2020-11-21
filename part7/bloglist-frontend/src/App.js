import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadSavedUser } from './reducers/loggedInUserReducer'
import { Switch, Link, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSavedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <div>
        <Link to="/" style={padding}>blogs</Link>
        <Link to="/users" style={padding}>users</Link>
      </div>

      <h1>Blog App</h1>
      <Notification />
      
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
      
    </div>
  )
}

export default App