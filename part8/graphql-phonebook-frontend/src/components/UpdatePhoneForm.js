import React, { useEffect, useState } from 'react'
import { UPDATE_NUMBER } from '../queries/index'
import { useMutation } from '@apollo/client'

const UpdatePhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [updateNumber, result] = useMutation(UPDATE_NUMBER)

  useEffect(() => {
    if (result.data && !result.data.editPhone) {
      setError('User not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const onSubmit = (event) => {
    event.preventDefault()
    updateNumber({ variables: {
      name,
      phone
    }})
    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>Update Phone Number:</h2>
      <form onSubmit={onSubmit}>
        <div>
          Name: <br />
          <input value={name}
            onChange={(({ target }) => setName(target.value))}
          />
        </div>
        <div>
          Phone: <br />
          <input value={phone}
            onChange={(({ target }) => setPhone(target.value))}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default UpdatePhoneForm