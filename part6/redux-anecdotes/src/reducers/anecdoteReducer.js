import anecdotesService from '../services/anecdotesService'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case ('INIT_ANECDOTES'):
      return action.data

    case ('VOTE'):
      return state.map(anecdote => (
        anecdote.id !== action.data.id
          ? anecdote
          : action.data
      ))

    case ('NEW_ANECDOTE'):
      return [...state, action.data]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.incrementVotes(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: savedAnecdote
    })
  }
}

export default anecdoteReducer