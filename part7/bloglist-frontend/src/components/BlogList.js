import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const dispatch = useDispatch()
  const createBlogFormRef = useRef()

  const handleCreateBlog = (title, author, url) => {
    createBlogFormRef.current.toggleIsVisible()
    dispatch(createBlog({title, author, url}))
  }

  const handleLikeBlog = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlog = (blog) => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div>

      <Togglable buttonText="create blog" ref={createBlogFormRef}>
        <CreateBlogForm
          createBlog={handleCreateBlog}
        />
      </Togglable>
      
      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
            key={blog.id}
            createdByUser={loggedInUser && loggedInUser.username === blog.user.username}
            blog={blog}
            likeBlog={() => handleLikeBlog(blog)}
            removeBlog={() => handleRemoveBlog(blog)}
          />
      )}
    </div>
  )
}

export default BlogList