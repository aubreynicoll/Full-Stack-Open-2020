import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  return (
    <div className="container">
      {(message &&
        <Alert variant="success">
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification