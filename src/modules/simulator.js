import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const CORE_ACCESS = 'simulator/CORE_ACCESS'
export const RENDER_CORE = 'simulator/RENDER_CORE'

// state
const initialState = {
  core: {},
  visualCore: [],
  isInitialised: false,
  queue: []
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

    case CORE_ACCESS:
      console.log(action.data);
      state.queue.push(action.data); // TODO: immutable
      insertItem
      return {
        ...state,
        queue: insertItem(state.queue, action)
      }

      //   //state.queue.push(action.data);

      // console.log(state.visualCore);

    default:
      return state
  }
}

const insertItem = (array, action) => {
  let newArray = array.slice();
  newArray.splice(0, 0, action.data);
  return newArray;
}

// actions
export const init = (standardId, parseResult) => {

  corewar.initialiseSimulator(standardId, parseResult, PubSub);

  return dispatch => {

    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      dispatch({
          type: CORE_ACCESS,
          data
        })
    });

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
