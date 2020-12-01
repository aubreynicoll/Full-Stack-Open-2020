import React from 'react'

const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div>
      <strong>{errorMessage}</strong>
    </div>
  )
}

export default Notification