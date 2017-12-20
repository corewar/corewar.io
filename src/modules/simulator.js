import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const RUN_REQUESTED = 'simulator/RUN_REQUESTED'
export const PAUSE_REQUESTED = 'simulator/PAUSE_REQUESTED'
export const RUN_ENDED = 'simulator/RUN_ENDED'
export const RUN_PROGRESS = 'simulator/RUN_PROGRESS'
export const GET_CORE_INSTRUCTIONS = 'simulator/GET_CORE_INSTRUCTIONS'

export const SET_INSTRUCTION_LIMIT = 'simulator/SET_INSTRUCTION_LIMIT'
export const SET_CORESIZE = 'simulator/SET_CORESIZE'
export const SET_MIN_SEPARATION = 'simulator/SET_MIN_SEPARATION'
export const SET_PROCESS_RATE = 'simulator/SET_PROCESS_RATE'


// state
const initialState = {
  isInitialised: false,
  isRunning: false,
  runProgress: 0,
  roundResult: {},
  result: {},
  coreSize: 8000,
  minSeparation: 1,
  instructionLimit: 1,
  instructions: [],
  processRate: 1,
  processRates: [
    1,
    2,
    5,
    12,
    30,
    75,
    200
  ]
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case INIT:
      return {
        ...state,
        isInitialised: true,
        roundResult: {}
      }

    case STEP:
      return {
        ...state
      }

    case RUN_REQUESTED:
      return {
        ...state,
        isRunning: true,
        roundResult: {}
      }

    case PAUSE_REQUESTED:
      return {
        ...state,
        isRunning: false
      }

    case RUN_PROGRESS:
      return {
        ...state,
        runProgress: action.data.runProgress
      }

    case RUN_ENDED:
      return {
        ...state,
        isRunning: false,
        roundResult: action.data
      }

    case GET_CORE_INSTRUCTIONS:
      return {
        ...state,
        instructions: action.instructions
      }

    case SET_CORESIZE:
      return {
        ...state,
        coreSize: action.value
      }

    case SET_MIN_SEPARATION:
      return {
        ...state,
        minSeparation: action.value
      }

    case SET_INSTRUCTION_LIMIT:
      return {
        ...state,
        instructionLimit: action.value
      }

    case SET_PROCESS_RATE:
      return {
        ...state,
        processRate: action.processRate
      }

    default:
      return state
  }
}

// actions
export const init = () => {

  console.log('init')

  return (dispatch, getState) => {

    const state = getState();

    PubSub.publish('RESET_CORE');

    const { coreSize, minSeparation, instructionLimit } = state.simulator;
    const { parseResults, standardId } = state.parser;

    const options = {
      standard: standardId,
      coresize: coreSize,
      minSeparation: minSeparation,
      instructionLimit: instructionLimit,
    };

    corewar.initialiseSimulator(options, parseResults, PubSub);

    dispatch({
      type: INIT
    });
  }
}

let runner = null;
let operations = 0

export const pause = () => {

  console.log('pause')

  window.clearTimeout(runner);

  return dispatch => {
    dispatch({
      type: PAUSE_REQUESTED
    })

  }
}

export const run = () => {

  console.log('run')

  return (dispatch, getState) => {
    dispatch({
      type: RUN_REQUESTED
    })

    PubSub.subscribe('RUN_PROGRESS', (msg, data) => {
      dispatch({
        type: RUN_PROGRESS,
        data
      })
    });

    PubSub.subscribe('ROUND_END', (msg, data) => {
      window.clearInterval(runner);
      dispatch({
        type: RUN_ENDED,
        data
      })
    });

    const { processRate, isRunning } = getState().simulator

    if(isRunning) {
      window.clearInterval(runner)
    }

    runner = window.setInterval(() => {

      for(let i = 0; i < processRate; i++) {
        corewar.simulator.step()
      }

      operations += processRate;

      // TODO: This should be controlled by the simulator
      if(operations === 80000) {
        window.clearInterval(runner)
        operations = 0
      }


    }, 1000/60)
  }
}

export const step = () => {

  console.log('step')

  return dispatch => {
    corewar.simulator.step();
  }
}

export const getCoreInstructions = (address) => {

  console.log('getCoreInstructions', address)

  const lowerLimit = address - 5;
  const upperLimit = address + 5;
  const instructions = [];

  for (let index = lowerLimit; index <= upperLimit; index++) {
    const instruction = corewar.core.getAt(index)
    instruction.isCurrent = index === address
    instructions.push(instruction)
  }

  return dispatch => {
    dispatch({
      type: GET_CORE_INSTRUCTIONS,
      instructions
    })
  }

}

export const setCoresize = (val) => {
  return dispatch => {
    dispatch({
      type: SET_CORESIZE,
      value: val
    })
  }
}

export const setMinSeparation = (val) => {
  return dispatch => {
    dispatch({
      type: SET_MIN_SEPARATION,
      value: val
    })
  }
}

export const setInstructionLimit = (val) => {
  return dispatch => {
    dispatch({
      type: SET_INSTRUCTION_LIMIT,
      value: val
    })
  }
}

export const setProcessRate = (rate) => {

  return (dispatch, getState) => {

    console.log('setProcessRate', rate)
    dispatch({
      type: SET_PROCESS_RATE,
      processRate: rate
    })

    window.clearInterval(runner)

    runner = window.setInterval(() => {

      for(let i = 0; i < rate; i++) {
        corewar.simulator.step()
      }

      operations += rate;

      // TODO: This should be controlled by the simulator
      if(operations === 80000) {
        window.clearInterval(runner)
        operations = 0
      }


    }, 1000/60)
  }
}