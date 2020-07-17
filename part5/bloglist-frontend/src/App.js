import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LogoutButton from './components/LogoutButton'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const createBlogFormRef = useRef()

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)

      setNotification(`logged in as ${user.name}`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    catch (exception) {
      setNotification('invalid creds, chummer')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)

    setNotification('logged out successfully')
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleCreateNew = async (title, author, url) => {
    try {
      const createdBlog = await blogService.createNew({ title, author, url })
      createBlogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))

      setNotification(`${createdBlog.title} by ${createdBlog.author} created successfully`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    catch (exception) {
      setNotification('blog creation failed')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.updateLikes(newBlog)
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }

  const handleRemoveBlog = async (blogToRemove) => {
    const result = window.confirm(`do you really want to ${blogToRemove.title} ${blogToRemove.author}? do you really want to make me cry?`)
    if (result) {
      await blogService.removeBlog(blogToRemove.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }
  }

  const displayNotification = () => {
    if (notification) {
      return (
        <div>
          <p className="Notification">{notification}</p>
        </div>
      )
    }
  }

  const logoutButton = () => {
    if (user) {
      return (
        <LogoutButton
          user={user}
          handleLogout={handleLogout} />
      )
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
        <CreateBlogForm handleCreateNew={handleCreateNew} />
      </Togglable>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedInUser')

    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <div>
        <h1>blog App</h1>
        {logoutButton()}
        {displayNotification()}
      </div>
      <div>
        {!user ? loginForm() : createBlogForm()}
      </div>
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => {
            return b.likes - a.likes
          })
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              currentUser={user ? user.username : null}
              handleLike={() => handleLike(blog)}
              handleRemoveBlog={() => handleRemoveBlog(blog)} />
          )
        }
      </div>
    </div>
  )
}

export default App