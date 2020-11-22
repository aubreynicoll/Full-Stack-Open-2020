import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  
  if (!message) {
    return null
  }

  return (
    <div>
      <strong>{message}</strong>
    </div>
  )
}

export default Notification