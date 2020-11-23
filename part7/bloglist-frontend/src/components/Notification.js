import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  if (!notification) {
    return null
  }

  const severity = notification.isSuccess ? 'success' : 'error'

  return (
    <div>
      <Alert severity={severity}>{notification.message}</Alert>
    </div>
  )
}

export default Notification