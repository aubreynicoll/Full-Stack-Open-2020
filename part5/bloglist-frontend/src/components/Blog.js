import React, { useState } from 'react'
const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showIfVisible = { display: visible ? '' : 'none' }

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
        <p>likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
        <p>user: {blog.user.username}</p>
      </div>
    </div>

  )
}

export default Blog
