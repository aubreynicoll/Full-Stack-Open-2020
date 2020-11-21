import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogsService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { loadSavedUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const createBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [dispatch])

  useEffect(() => {
    dispatch(loadSavedUser())
  }, [dispatch])

  const login = (username, password) => { 
    dispatch(loginUser({ username, password}))
  }

  const handleLogout = () => {
    dispatch(logoutUser()) 
  }

  const handleCreateBlog = (title, author, url) => {
    createBlogFormRef.current.toggleIsVisible()
    dispatch(createBlog({title, author, url}))
  }

  const handleLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = (blog) => {
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