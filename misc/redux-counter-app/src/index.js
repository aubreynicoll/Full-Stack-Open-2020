import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

const store = createStore(countReducer)

const App = () => {


  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <div>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => store.dispatch({ type: 'RESET' })}>reset</button>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+1</button>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)