import { corewar } from "corewar";

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'

// state
const initialState = {
  core: {},
  isInitialised: false
}


// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case INIT:
      return {
        ...state,
        core: action.core,
        isInitialised: true
      }

    case STEP:
      return {
        ...state,
        core: action.core
      }

    default:
      return state
  }
}

// actions
export const init = (standardId, parseResult) => {

  corewar.initialiseSimulator(standardId, parseResult);

  return dispatch => {
    dispatch({
      type: INIT_REQUESTED
    })

    dispatch({
      type: INIT,
      core: corewar.core
    })
  }
}

export const step = () => {

  corewar.simulator.step();

  return dispatch => {
    dispatch({
      type: STEP,
      core: corewar.core
    })
  }
}
