import React from 'react'

const LogoutButton = ({ user, handleLogout }) => {
  return (
    <div>
      logged in as {user.name} <button type="button" onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutButton