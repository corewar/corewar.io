import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

import { removeItem } from './../helpers/arrayHelpers'

import {
  PARSE_REQUESTED,
  PARSE,
  ADD_WARRIOR_REQUESTED,
  ADD_WARRIOR,
  REMOVE_WARRIOR_REQUESTED,
  REMOVE_WARRIOR
} from './../actions/parserActions'

// state
const initialState = {
  isParsing: false,
  currentParseResult: {},
  parseResults: [],
  standardId: 2, // TODO: what's the best standard to use as a default?
  redcode: '',
  warrior: ''
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

    default:
      return state
  }
}

