import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const CreateBlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog({ title, author, url }))    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <br />
          <input 
            type="text"
            name="title"
            id="title-input"
            />
        </div>
        <div>
          author: <br />
          <input 
            type="text"
            name="author"
            id="author-input"
          />
        </div>
        <div>
          url: <br />
          <input 
            type="text"
            name="url"
            id="url-input"
          />
        </div>
        <button type="submit" id="submit-blog-button">create blog</button>
      </form>
    </div>
  )
}

export default CreateBlogForm