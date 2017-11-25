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
        taskExecution: action.taskExecution,
        isInitialised: true
      }

    case STEP:
      return {
        ...state,
        taskExecution: updateTasks(action.taskExecution, state.taskExecution)
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

const updateTasks= (tasks, taskExecution) => {
  let adjustedArray;
  tasks.forEach(task => {
    adjustedArray = updateTask(task.address, taskExecution, task)
  });
  return adjustedArray;
}

const updateItem = (index, array, item) => {
  const newArray = array.slice();
  newArray[index] = coreAccessToCell(item);
  return newArray;
}

const updateTask = (index, array, item) => {
  const newArray = array.slice();
  newArray[index] = taskToCell(item);
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
       name: '¤',
       css: 'read',
       path: ''
     }
    case 1:
     return {
       name: '×',
       css: 'write',
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
    colour: icon.css
  };
};

const taskToCell = (task) => {

  return {
    address: task.address,
    label: '',
    icon: task.icon,
    colour: task.colour
  }

};

const defaultCell = {
	  address: 0,
	  label: '-',
	  colour: 'default',
    icon: ''
};

const warriorToCellColour = (warriorNumber, warriorIndex) => {

  if(warriorIndex == warriorNumber) {
    return 'white';
  } else {
    return 'red';
  }

}

const mapStateToExecution = (state) => {

  return state.warriors.map((w, i) =>
      w.tasks.map(t => {
        return {
          address: t.instructionPointer,
          warrior: i,
          colour: warriorToCellColour(i, state.warriorIndex)
        }
      })).reduce((a, c) => a.concat(c));

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
  taskExecution.fill(defaultCell, 0, taskExecution.length)

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

  const state = corewar.simulator.getState();

  const taskExecution = mapStateToExecution(state);

  corewar.simulator.step();

  return dispatch => {
    dispatch({
      type: STEP,
      taskExecution: taskExecution
    })
  }
}
