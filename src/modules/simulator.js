import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const CORE_ACCESS = 'simulator/CORE_ACCESS'
export const RENDER_CORE = 'simulator/RENDER_CORE'

// state
const initialState = {
  core: [],
  coreAccess: [],
  taskExcution: [],
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
        coreAccess: action.coreAccess,
        taskExcution: action.taskExcution,
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

const mapStateToExecution = (state) => {




};

// actions
export const init = (standardId, parseResult) => {

  const simulatorState = corewar.initialiseSimulator(standardId, parseResult, PubSub);

  const coreAccess = new Array(simulatorState.core.instructions.length);
  const taskExecution = new Array(simulatorState.core.instructions.length);

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
      core: simulatorState.core,
      coreAccess: coreAccess,
      taskExcution: taskExecution
    })
  }
}

export const step = () => {

  corewar.simulator.step();

  const state = corewar.simulator.getState();

  const taskExcution = mapStateToExecution(state);

  return dispatch => {
    dispatch({
      type: STEP,
      taskExcution: taskExcution
    })
  }
}
