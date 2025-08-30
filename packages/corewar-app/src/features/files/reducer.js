import { SET_CURRENT_FILE, SET_FILES, LOAD_FILE, SET_COLOURS } from './actions'

// state
import initialState from './state/initial-state'

// selectors
export const getFileState = state => state.file
export const getCurrentFile = state => state.file.currentFile

// reducer
const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.currentFile
      }

    case SET_FILES:
      return {
        ...state,
        files: action.files
      }

    case SET_COLOURS:
      return {
        ...state,
        colours: action.colours
      }

    case LOAD_FILE:
      return {
        ...state,
        currentFile: action.file
      }

    default:
      return state
  }
}

export default filesReducer
