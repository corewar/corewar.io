//import { corewar } from "corewar";

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
        ...state
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
export const init = () => {

  return dispatch => {
    dispatch({
      type: INIT_REQUESTED
    })

    dispatch({
      type: INIT
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
