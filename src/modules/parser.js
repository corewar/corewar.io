import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

import { INIT } from './simulator';

export const PARSE_REQUESTED = 'parser/PARSE_REQUESTED'
export const PARSE = 'parser/PARSE'
export const SET_STANDARD = 'parser/SET_STANDARD'
export const SAVE = 'parser/SAVE'
export const REMOVE_WARRIOR = 'parser/REMOVE_WARRIOR'

// state
const initialState = {
  isParsing: false,
  currentParseResult: {},
  parseResults: [],
  standardId: 2, // TODO: what's the best standard to use as a default?
  redcode: '',
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

    case PARSE:
      return {
        ...state,
        currentParseResult: action.result,
        redcode: action.redcode,
        isParsing: false
      }

    case SAVE:
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

const insertItem = (index, array, item) => {
  let newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

const removeItem = (index, array) => {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}

// actions
export const save = () => {

  console.log('save')

  return (dispatch, getState) => {

    const state = getState();

    const { standardId, currentParseResult, parseResults } = state.parser;
    const { coreSize, minSeparation, instructionLimit } = state.simulator;

    const result = insertItem(parseResults.length, parseResults, currentParseResult)

    dispatch({
      type: SAVE,
      result
    })

    PubSub.publish('RESET_CORE');

    const options = {
      standard: standardId,
      coresize: coreSize,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
    };

    corewar.initialiseSimulator(options, result, PubSub);

    dispatch({
      type: INIT
    });

  }
};

export const parse = (redcode) => {

  console.log('parse')

  return dispatch => {
    dispatch({
      type: PARSE_REQUESTED
    })

    let result = corewar.parser.parse(redcode);
    // TODO: could we serialise the parse result in the core?
    const warrior = corewar.serialiser.serialise(result.tokens);
    result.warrior = warrior;

    dispatch({
      type: PARSE,
      result,
      redcode
    })
  }
}

export const removeWarrior = (index) => {

  console.log('remove_warrior', index)

  return (dispatch, getState) => {

    const { parseResults } = getState().parser;

    const result = removeItem(index, parseResults);

    dispatch({
      type: REMOVE_WARRIOR,
      result
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

