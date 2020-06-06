import React from 'react'

const SearchBar = (props) => {
  const {text, searchName, searchInputHandler} = props

  return(
    <div>
      {text} <input
                value={searchName}
                onChange={searchInputHandler} />
    </div>
  )
}

export default SearchBar
