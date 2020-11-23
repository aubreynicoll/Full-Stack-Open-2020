import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>

            <TableRow>
              <TableCell />
              <TableCell>
                Blogs Created:
              </TableCell>
            </TableRow>

            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList