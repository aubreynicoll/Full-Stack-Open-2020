import usersService from '../services/users'

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.data
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

export const clearUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }
}

export default usersReducer