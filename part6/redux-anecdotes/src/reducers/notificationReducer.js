const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutId

export const setNotification = (string, seconds) => {
  return async (dispatch) => {
    timeoutId && clearTimeout(timeoutId)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: string
    })

    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer