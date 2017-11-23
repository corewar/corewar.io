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
  taskExecution: [],
  isInitialised: false,
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
        taskExecution: action.taskExecution
      }

    case CORE_ACCESS:
      return {
        ...state,
        coreAccess: updateItem(action.data.address, state.coreAccess, action.data)
      }

    default:
      return state
  }
}

const updateItem = (index, array, item) => {
  const newArray = array.slice();
  newArray[index] = coreAccessToCell(item);
  return newArray;
}

const insertItem = (index, array, item) => {
  let newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

const accessTypeToIcon = (accessType) => {
  switch(accessType) {
    case 0:
     return {
       name: 'R',
       path: ''
     }
    case 1:
     return {
       name: 'W',
       path: ''
     }
    default:
     return {
       name: '&#9785;',
       path: ''
     }
  }
}

const coreAccessToCell = (coreAccess) => {
  const icon = accessTypeToIcon(coreAccess.accessType);
  return {
    address: coreAccess.address,
    label: icon.name,
    icon: icon.icon,
    colour: ''
  };
};

const defaultCell = {
	  address: 0,
	  label: '-',
	  colour: 'default',
    icon: ''
};

const mapStateToExecution = (state) => {


  debugger;
  //TODO: Decide whether this is mapped here or in components
  state.map((state) => {
    return {
      warriorIndex: state.warriorIndex,
      warriors: state.warriors,
    }
  });
};

const mapCoreToUi = (instructions) => {

  return instructions.map(cell => (
    {
      address: cell.address,
      label: corewar.instructionSerialiser.serialise(cell),
      color: 'default',
      icon: 'none'
    }
  ));

};

// actions
export const init = (standardId, parseResult) => {

  const simulatorState = corewar.initialiseSimulator(standardId, parseResult, PubSub);

  const coreAccess = new Array(simulatorState.core.instructions.length);
  coreAccess.fill(defaultCell, 0, coreAccess.length)
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
      core: mapCoreToUi(simulatorState.core.instructions),
      coreAccess: coreAccess,
      taskExecution: taskExecution
    })
  }
}

export const step = () => {

  corewar.simulator.step();

  const state = corewar.simulator.getState();

  //const taskExecution = mapStateToExecution(state);

  return dispatch => {
    dispatch({
      type: STEP,
      taskExecution: state
    })
  }
}
