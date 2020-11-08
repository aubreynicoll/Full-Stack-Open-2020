import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'
  Togglable.propTypes = {
    buttonText: PropTypes.string.isRequired
  }
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none' : '' }

  const toggleIsVisible = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleIsVisible
    }
  })

  return (
    <div>

      <div style={hideWhenVisible}>
        <button onClick={toggleIsVisible}>{props.buttonText}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleIsVisible}>cancel</button>
      </div>
      
    </div>
  )
})

export default Togglable