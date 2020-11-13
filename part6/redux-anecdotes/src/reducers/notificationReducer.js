const initialState = 'This is a test'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (string) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: string
  }
}

export default notificationReducer