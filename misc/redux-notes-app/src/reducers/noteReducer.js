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

const generateId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTTANCE',
    data: { id }
  }
}

export default noteReducer