import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const NoteFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(changeFilter('ALL'))} 
      /> 
      all
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(changeFilter('IMPORTANT'))} 
      /> 
      important
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(changeFilter('NOT_IMPORTANT'))} 
      /> 
      not important
    </div>
  )
}

export default NoteFilter