import { corewar } from "corewar";

export const PARSE_REQUESTED = 'parser/INCREMENT_REQUESTED'
export const PARSE = 'parser/INCREMENT'
export const SET_STANDARD = 'parser/SET_STANDARD'
export const SAVE = 'parser/SAVE'

// state
const initialState = {
  isParsing: false,
  currentParseResult: {},
  parseResults: [],
  standardId: 2,
  redcode: 'MOV 0, 1',
  warrior: ''
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

    case SAVE:
      return {
        ...state,
        parseResults: insertItem(state.parseResults.length, state.parseResults, state.currentParseResult)
      }

    case PARSE:
      return {
        ...state,
        currentParseResult: action.result,
        redcode: action.redcode,
        isParsing: false
      }

    default:
      return state
  }
}

const insertItem = (index, array, item) => {
  let newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

// actions
export const save = () => {
  return dispatch => {
    dispatch({
      type: SAVE
    })
  }
};

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

