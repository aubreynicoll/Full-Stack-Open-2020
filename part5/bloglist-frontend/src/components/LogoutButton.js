import React from 'react'
import PropTypes from 'prop-types'

const LogoutButton = ({ user, handleLogout }) => {
  return (
    <div>
      logged in as {user.name} <button type="button" onClick={handleLogout}>logout</button>
    </div>
  )
}

LogoutButton.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LogoutButton