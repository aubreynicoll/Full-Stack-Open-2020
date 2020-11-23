import { Button, TextField } from '@material-ui/core'
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
      dispatch(setMessage(`You created '${title}'`, true))
      history.push('/')
    } catch (e) {
      dispatch(setMessage('Title and Url are required.', false))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="title" name="title" />
        </div>
        <div>
          <TextField label="author" name="author" />
        </div>
        <div>
          <TextField label="url" name="url" />
        </div>
        <Button type="submit" variant="contained" color="primary">create blog</Button>
      </form>
    </div>
  )
}

export default CreateBlogForm