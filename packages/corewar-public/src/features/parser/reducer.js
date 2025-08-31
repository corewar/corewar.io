import {
  HIDE_CONSOLE,
  LOAD_WARRIOR,
  SET_COLOURS,
  SET_CURRENT_WARRIOR,
  SET_WARRIORS,
  SHOW_CONSOLE,
  TOGGLE_CONSOLE,
  TOGGLE_FILE_MANAGER
} from './actions'

// state
import initialState from './initialState'

// selectors
export const getParserState = (state) => state.parser

// reducer
const parserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_WARRIOR:
      return {
        ...state,
        displayFileManager: false,
        currentWarrior: action.currentWarrior
      }

    case SET_WARRIORS:
      return {
        ...state,
        warriors: action.warriors
      }

    case SET_COLOURS:
      return {
        ...state,
        colours: action.colours
      }

    case LOAD_WARRIOR:
      return {
        ...state,
        currentWarrior: action.warrior
      }

    case TOGGLE_CONSOLE:
      return {
        ...state,
        displayConsole: !state.displayConsole
      }

    case HIDE_CONSOLE:
      return {
        ...state,
        displayConsole: false
      }

    case SHOW_CONSOLE:
      return {
        ...state,
        displayConsole: true
      }

    case TOGGLE_FILE_MANAGER:
      return {
        ...state,
        displayFileManager: !state.displayFileManager
      }

    default:
      return state
  }
}

export default parserReducer
