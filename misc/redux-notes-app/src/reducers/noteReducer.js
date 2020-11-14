const initialState = []

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ('NEW_NOTE'):
      return [...state, action.data]

    case ('INIT_NOTES'):
      return action.data

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

export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes
  }
}

export default noteReducer