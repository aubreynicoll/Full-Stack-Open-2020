import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, handleLike, handleRemoveBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showIfVisible = { display: visible ? '' : 'none' }
  const showIfUser = { display: currentUser === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible? 'hide' : 'show'}</button>
      </div>
      <div style={showIfVisible}>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>user: {blog.user.username}</p>
        <button style={showIfUser} onClick={handleRemoveBlog}>remove</button>
      </div>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog
