const noteReducer = (state = [], action) => {
  switch (action.type) {
    case ('NEW_NOTE'):
      return state.concat(action.data)

    case ('TOGGLE_IMPORTANCE'):
      return state.map(n => (
        n.id === action.data.id 
          ? { ...n, important: !n.important } 
          : n
        ))

    default:
      return state
  }
}

export default noteReducer