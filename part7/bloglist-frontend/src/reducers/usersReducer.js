import usersService from '../services/users'

const initialState = []

const usersReducer = (state = initialState, action) => {
  let id
  switch (action.type) {
    case 'SET_USERS':
      return action.data
    case 'UPDATE_USER':
      id = action.data.id
      return state.map(user => user.id === id ? action.data : user)
    case 'CLEAR_USERS':
      return []
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export const refreshUserById = (id) => {
  return async (dispatch) => {
    const user = await usersService.getById(id)
    dispatch({
      type: 'UPDATE_USER',
      data: user
    })
  }
}

export const clearUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }
}

export default usersReducer