import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from '../reducers/blogsReducer'
import { setMessage } from '../reducers/notificationReducer'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    try {
      await dispatch(createBlog({ title, author, url }))
      dispatch(setMessage(`You created '${title}'`))
      history.push('/')
    } catch (exception) {
      dispatch(setMessage('Title and Url are required.'))
    }
    
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