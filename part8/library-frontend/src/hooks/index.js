import { useState } from 'react'

export const useInput = (type) => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const reset = () => setValue('')

  const props = {
    type,
    value,
    onChange
  }

  return {
    type,
    value,
    onChange,
    reset,
    props
  }
}