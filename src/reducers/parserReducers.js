import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

import { removeItem } from './../helpers/arrayHelpers'

import { INIT } from './simulatorReducers';

export const PARSE = 'parser/PARSE'
export const SET_STANDARD = 'parser/SET_STANDARD'
export const ADD_WARRIOR = 'parser/ADD_WARRIOR'
export const REMOVE_WARRIOR = 'parser/REMOVE_WARRIOR'
export const RESET_CORE = 'parser/RESET_CORE'

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

    case SET_STANDARD:
      return {
        ...state,
        standardId: action.standardId
      }

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

    case RESET_CORE:
      return {
        ...state
      }

    default:
      return state
  }
}

// actions
export const removeWarrior = (index) => {

  console.log('remove_warrior', index)

  return (dispatch, getState) => {

    const state = getState();

    const { standardId, parseResults } = state.parser;
    const { coreSize, minSeparation, instructionLimit } = state.simulator;

    const result = removeItem(index, parseResults);

    dispatch({
      type: REMOVE_WARRIOR,
      result
    })

    dispatch({
      type: RESET_CORE
    })

    const options = {
      standard: standardId,
      coresize: coreSize,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
    };

    corewar.initialiseSimulator(options, result, PubSub);

    dispatch({
      type: INIT
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

