import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

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

  const handleCreateNew = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.createNew({ title, author, url })
      setBlogs(blogs.concat(createdBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

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

  const displayNotification = () => {
    if (notification) {
      return (
        <div>
          <p class="Notification">{notification}</p>
        </div>
      )
    }
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

  if (!user) {
    return (
      <div>
        <h2>login</h2>
        {displayNotification()}
        <form onSubmit={handleLogin}>
          <div>
            username: 
            <input 
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password: 
            <input 
              type="text"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <div>
          <h2>blogs</h2>
          {displayNotification()}
          <p>
            logged in as {user.name} <button type="button" onClick={handleLogout}>logout</button>
          </p>                  
        </div>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleCreateNew}>
            <div>
              title:
              <input
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
              author:
              <input
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
              url:
              <input
                type="text"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">create new</button>
          </form>
        </div>
        <div>          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}          
        </div>
      </div>
    )
  }  
}

export default App