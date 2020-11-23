import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogsReducer'
import { setMessage } from '../reducers/notificationReducer'

const CommentsSection = ({ comments, handleAddComment }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    handleAddComment(comment)
  }

  return (
    <div>
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="comment"  
        />
        <button type="submit">Add Comment</button>
      </form>
      
      <ul>
        {comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(state => state.loggedInUser)

  if (!blog) {
    return null
  }

  const createdByCurrentUser = currentUser && currentUser.username === blog.user.username

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setMessage(`You liked '${blog.title}'`, true))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
    dispatch(setMessage(`You deleted '${blog.title}'`, true))
    history.push('/')
  }

  const handleAddComment = (comment) => {
    dispatch(commentOnBlog(blog, comment))
    dispatch(setMessage(`You commented: '${comment}'`, true))
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
        {createdByCurrentUser && <button onClick={handleDelete}>Delete</button>}
      </div>

      <CommentsSection comments={blog.comments} handleAddComment={handleAddComment} />    
    </div>
  )
}

export default Blog