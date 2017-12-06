import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const RUN_REQUESTED = 'simulator/RUN_REQUESTED'
export const PAUSE_REQUESTED = 'simulator/PAUSE_REQUESTED'
export const RUN_ENDED = 'simulator/RUN_ENDED'
export const RUN_PROGRESS = 'simulator/RUN_PROGRESS'

export const SET_INSTRUCTION_LIMIT = 'simulator/SET_INSTRUCTION_LIMIT'
export const SET_CORESIZE = 'simulator/SET_CORESIZE'
export const SET_MIN_SEPARATION = 'simulator/SET_MIN_SEPARATION'

// state
const initialState = {
  isInitialised: false,
  isRunning: false,
  runProgress: 0,
  result: {},
  coreSize: 8000,
  minSeparation: 1,
  instructionLimit: 1
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case INIT:
      return {
        ...state,
        isInitialised: true
      }

    case STEP:
      return {
        ...state
      }

    case RUN_REQUESTED:
      return {
        ...state,
        isRunning: true
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
        result: console.log('END', action.result)
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

    default:
      return state
  }
}

// actions
export const init = (standardId, parseResults, coreSize, minSeparation, instructionLimit) => {

  const options = {
    standard: standardId,
    coresize: parseInt(coreSize, 10),
    minSeparation: parseInt(minSeparation, 10),
    instructionLimit: parseInt(instructionLimit, 10),
  };

  return dispatch => {

    dispatch({
      type: INIT_REQUESTED
    });

    console.log('init', options);

    const simulatorState = corewar.initialiseSimulator(options, parseResults, PubSub);

    dispatch({
      type: INIT
    });
  }
}

let runner = null;

export const pause = () => {

  window.clearTimeout(runner);

  return dispatch => {

    dispatch({
      type: PAUSE_REQUESTED
    })

  }
}

export const run = (processRate) => {

  return dispatch => {

    dispatch({
      type: RUN_REQUESTED
    })

    PubSub.subscribe('RUN_PROGRESS', (msg, data) => {
      dispatch({
        type: RUN_PROGRESS,
        data
      })
    });

    let operations = 0;

    runner = window.setInterval(() => {

      for(let i = 0; i < processRate; i++) {
        step();
      }

      operations += processRate;

      if(operations === 80000) {
        window.clearInterval(runner);
      }


    }, 1000/60)
  }

  //     //for(var i = 0; i < 5; i++) {
  //         step();
  //     //}

  // //for(var i = 0; i < 80000; i++) {

  //   window.requestAnimationFrame(run.bind(this))
  //}
}

export const step = () => {
  corewar.simulator.step();
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