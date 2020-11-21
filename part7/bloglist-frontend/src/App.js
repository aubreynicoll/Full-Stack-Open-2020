import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  const createBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)  
      setUser(user)
    } catch (exception) {
      console.error(exception)
    }    
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)    
  }

  const handleCreateBlog = async (title, author, url) => {
    createBlogFormRef.current.toggleIsVisible()
    dispatch(createBlog({title, author, url}))
  }

  const handleLikeBlog = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  const loginForm = () => {
    return (
      <LoginForm
        login={login}
      />
    )
  }

  const appInterface = () => {
    return (
      <div>
        <p>logged in as {user.name} <button onClick={handleLogout}>log out</button></p>

        <Togglable buttonText="create blog" ref={createBlogFormRef}>
          <CreateBlogForm
            createBlog={handleCreateBlog}
          />
        </Togglable>
        
        <h2>blogs</h2>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog 
              key={blog.id}
              createdByUser={user.username === blog.user.username}
              blog={blog}
              likeBlog={() => handleLikeBlog(blog)}
              removeBlog={() => handleRemoveBlog(blog)}
            />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog App</h1>

      {notification === null
        ? null
        : <p>{notification}</p>
      }

      {user === null
        ? loginForm()
        : appInterface()
      }
    </div>
  )
}

export default App