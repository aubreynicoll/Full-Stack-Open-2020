import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadSavedUser } from './reducers/loggedInUserReducer'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSavedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const padding = {
    padding: 10
  }

  return (
    <Router>    
      <div>
        <Link to="/" style={padding}>blogs</Link>
      </div>

      <h1>Blog App</h1>
      <Notification />
      
      <Switch>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
      
    </Router>
  )
}

export default App