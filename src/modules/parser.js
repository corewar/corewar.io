import { corewar } from "corewar";

export const PARSE_REQUESTED = 'parser/INCREMENT_REQUESTED'
export const PARSE = 'parser/INCREMENT'
export const SET_STANDARD = 'parser/SET_STANDARD'

// state
const initialState = {
  isParsing: false,
  parseResult: {
    messages: [],
    tokens: []
  },
  warrior: '',
  standardId: 2,
  redcode: 'MOV 0, 1'
}


// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SET_STANDARD:
      return {
        ...state,
        standardId: action.standardId
      }

    case PARSE_REQUESTED:
      return {
        ...state,
        isParsing: true
      }

    case PARSE:
      return {
        ...state,
        parseResult: action.result,
        redcode: action.redcode,
        isParsing: false
      }

    default:
      return state
  }
}

// actions
export const parse = (redcode) => {

  let result = corewar.parser.parse(redcode);
  const warrior = corewar.serialiser.serialise(result.tokens);
  result.warrior = warrior;

  return dispatch => {
    dispatch({
      type: PARSE_REQUESTED
    })

    dispatch({
      type: PARSE,
      result,
      redcode
    })
  }
}

export const setStandard = (standardId) => {
  return dispatch => {
    dispatch({
      type: SET_STANDARD,
      standardId
    })
  }
}
