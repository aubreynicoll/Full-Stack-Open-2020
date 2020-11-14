import notesService from '../services/notesService'

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

export const createNote = (content) => {
  return async (dispatch) => {
    const savedNote = await notesService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: savedNote
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await notesService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}

export default noteReducer