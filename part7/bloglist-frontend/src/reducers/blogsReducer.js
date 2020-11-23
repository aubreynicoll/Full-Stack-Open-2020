import blogsService from '../services/blogs'
import { refreshUserById } from './usersReducer'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  let id
  switch (action.type) {    
    case 'INIT_BLOGS':
      return action.data
    
    case 'CREATE_BLOG':
      return [...state, action.data]

    case 'UPDATE_BLOG':
      id = action.data.id
      return state.map(blog => blog.id === id ? action.data : blog)

    case 'DELETE_BLOG':
      id = action.data.id
      return state.filter(blog => blog.id !== id)

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogsService.createNew(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: savedBlog
    })
    dispatch(refreshUserById(savedBlog.user.id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const savedBlog = await blogsService.update(blog.id, updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: savedBlog
    })
  }
}

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    const savedBlog = await blogsService.postComment(blog.id, { comment })
    dispatch({
      type: 'UPDATE_BLOG',
      data: savedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deletePost(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
    dispatch(refreshUserById(blog.user.id))
  }
}

export default blogsReducer