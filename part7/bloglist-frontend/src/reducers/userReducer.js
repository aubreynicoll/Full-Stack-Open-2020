import blogsService from '../services/blogs'
import loginService from '../services/login'

const initialState = {
  name: "anonymous",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNuYWtlIiwiaWQiOiI1ZjljYjc3ZTFiNTMwMTBiNDcwNjg4NGEiLCJpYXQiOjE2MDU4NjY2MDF9.rPiHVamy1DIVQP9-voNdtQ4rr0zBEL1eVXUQrS2SSJ8",
  username: "snake"
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const loadSavedUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('loggedInUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    blogsService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    blogsService.setToken(null)
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export default userReducer