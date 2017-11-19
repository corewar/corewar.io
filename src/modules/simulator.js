import { corewar } from "corewar";

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'

// state
const initialState = {
  core: [
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } },
    { addressInfo: { cmd: 'dat' } }
  ]
}


// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case INIT:
      return {
        ...state,
        core: [action.coreSize]
      }

    case STEP:
      return {
        ...state
      }

    default:
      return state
  }
}

// actions
export const init = (coreSize = 100) => {

  debugger;
  corewar.simulator.init();

  return dispatch => {
    dispatch({
      type: INIT_REQUESTED
    })

    dispatch({
      type: INIT,
      coreSize
    })
  }
}

export const step = () => {

    return dispatch => {
      dispatch({
        type: STEP
      })
    }
  }
