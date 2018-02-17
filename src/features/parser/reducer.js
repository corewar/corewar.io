import {
  PARSE,
  SHOW_MESSAGES,
  HIDE_MESSAGES,
  TOGGLE_FILE_MANAGER,
  SET_WARRIORS,
  LOAD_WARRIOR
} from './actions'

import { defaultWarriors } from '../../helpers/defaultWarriors'

// state
const initialState = {
  currentWarrior: {},
  warriors: [],
  warriorLibrary: defaultWarriors,
  standardId: 2, // TODO: what's the best standard to use as a default?
  displayMessages: false,
  displayFileManager: false
}

// selectors
export const getParserState = state => state.parser

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case PARSE:
      return {
        ...state,
        currentWarrior: action.currentWarrior
      }

    case SET_WARRIORS:
      return {
        ...state,
        warriors: action.warriors
      }

    case LOAD_WARRIOR:
      return {
        ...state,
        currentWarrior: action.warrior
      }

    case SHOW_MESSAGES:
      return {
        ...state,
        displayMessages: true
      }

    case HIDE_MESSAGES:
      return {
        ...state,
        displayMessages: false
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

