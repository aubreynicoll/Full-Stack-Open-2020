import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {
  CreateBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <br />
          <input 
            type="text"
            id="title-input"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author: <br />
          <input 
            type="text"
            id="author-input"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: <br />
          <input 
            type="text"
            id="url-input"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="submit-blog-button">create blog</button>
      </form>
    </div>
  )
}

export default CreateBlogForm