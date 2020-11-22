import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const createdByLoggedInUser = useSelector(state => (
    state.loggedInUser 
      && state.loggedInUser.username === blog.user.username
  ))

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setMessage(`You liked '${blog.title}'`))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
    dispatch(setMessage(`You deleted '${blog.title}'`))
    history.push('/')
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
        {blog.likes} likes
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
      <div>
        <button onClick={handleLike}>Like</button>
        {createdByLoggedInUser && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  )
}

export default Blog