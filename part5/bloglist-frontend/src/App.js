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

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
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

  const createBlog = async (blog) => {
    try {
      createBlogFormRef.current.toggleIsVisible()
      const savedBlog = await blogService.createNew(blog)
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
        <p>Welcome Back, {user.name}. <button onClick={handleLogout}>log out</button></p>

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
      {user === null
        ? loginForm()
        : appInterface()
      }
    </div>
  )
}

export default App