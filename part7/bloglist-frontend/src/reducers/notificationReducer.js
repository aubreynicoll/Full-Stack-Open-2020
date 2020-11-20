const initialState = 'This is a test.'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

let timeoutId

export const setMessage = (message) => {
  return async (dispatch) => {
    timeoutId && clearTimeout(timeoutId)

    dispatch({
      type: 'SET_MESSAGE',
      message
    })

    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }
}

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }
}

export default notificationReducer