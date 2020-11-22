import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadSavedUser } from './reducers/loggedInUserReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import MenuBar from './components/MenuBar'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Footer from './components/Footer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSavedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogs = useSelector(state => state.blogs)
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <MenuBar />
      <h1>Blog App</h1>
      <Notification />
      
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>

        <Route path="/users">
          <UserList />
        </Route>

        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>

        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path="/create">
          <CreateBlogForm />
        </Route>
        
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
      
      <Footer />
    </div>
  )
}

export default App