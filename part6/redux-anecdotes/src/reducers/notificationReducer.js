const initialState = {
  message: null,
  timeoutId: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state.timeoutId && window.clearTimeout(state.timeoutId)
      return action.data
    default:
      return state
  }
}

export const setNotification = (string, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: string,
        timeoutId: setTimeout(() => {
          dispatch(removeNotification())
        }, seconds * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message: null,
      timeoutId: null
    }
  }
}

export default notificationReducer