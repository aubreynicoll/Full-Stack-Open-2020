import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        {count}
      </div>
      <div>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>reset</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  )
}

export default App