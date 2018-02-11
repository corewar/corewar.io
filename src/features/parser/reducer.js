import {
  PARSE,
  ADD_WARRIOR,
  REMOVE_WARRIOR,
  SHOW_MESSAGES,
  HIDE_MESSAGES,
  ADD_NOTIFICATION
} from './actions'

import { insertItem } from '../../helpers/arrayHelpers'

// state
const initialState = {
  isParsing: false,
  currentParseResult: {},
  parseResults: [],
  standardId: 2, // TODO: what's the best standard to use as a default?
  redcode: '',
  warrior: '',
  displayMessages: false,
  notifications: []
}

// selectors
export const getParserState = state => state.parser

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case PARSE:
      return {
        ...state,
        currentParseResult: action.result,
        redcode: action.redcode,
        isParsing: false
      }

    case ADD_WARRIOR:
      return {
        ...state,
        parseResults: action.result
      }

    case REMOVE_WARRIOR:
      return {
        ...state,
        parseResults: action.result
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

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: insertItem(0, state.notifications, action.msg)
      }

    default:
      return state
  }
}

