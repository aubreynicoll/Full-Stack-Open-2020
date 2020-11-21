import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

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
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
    </div>
  )
}

export default Blog