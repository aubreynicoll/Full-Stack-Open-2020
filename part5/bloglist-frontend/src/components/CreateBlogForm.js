import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleCreateNew }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = (event) => {
    event.preventDefault()
    handleCreateNew(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create new</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  handleCreateNew: PropTypes.func.isRequired
}

export default CreateBlogForm