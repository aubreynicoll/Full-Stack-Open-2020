import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}, by {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
    </div>
  )
}

export default Blog