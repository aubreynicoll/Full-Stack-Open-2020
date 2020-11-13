const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state = initialState, action) => {
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
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer