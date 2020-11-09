import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const createBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }    
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)    
  }

  const createBlog = async (title, author, url) => {
    try {
      createBlogFormRef.current.toggleIsVisible()
      const savedBlog = await blogService.createNew({ title, author, url })
      setBlogs(blogs.concat(savedBlog))
    } catch (exception) {
      console.error(exception)
    }
    
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const savedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id === savedBlog.id ? savedBlog : b))
  }

  const removeBlog = async (blog) => {
    await blogService.deletePost(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
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
            createBlog={createBlog}
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
              likeBlog={() => likeBlog(blog)}
              removeBlog={() => removeBlog(blog)}
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