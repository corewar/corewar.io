import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const RUN_REQUESTED = 'simulator/RUN_REQUESTED'
export const RUN_ENDED = 'simulator/RUN_ENDED'
export const RUN_PROGRESS = 'simulator/RUN_PROGRESS'
export const CORE_ACCESS = 'simulator/CORE_ACCESS'
export const RENDER_CORE = 'simulator/RENDER_CORE'

// state
const initialState = {
  core: [],
  coreAccess: [],
  taskExecution: [],
  isInitialised: false,
  currentExecutionAddress: null,
  isRunning: false,
  runProgress: 0,
  result: {}
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
        taskExecution: tasksToExecutionState(action.taskExecution, state, action.currentExecutionAddress),
        currentExecutionAddress: action.currentExecutionAddress
      }

    case RUN_REQUESTED:
      return {
        ...state,
        isRunning: true
      }

    case RUN_PROGRESS:
      return {
        ...state,
        runProgress: action.data
      }

    case RUN_ENDED:
      return {
        ...state,
        isRunning: false,
        result: console.log(action.result)
      }

    case CORE_ACCESS:
      return {
        ...state,
        crap: console.log(action.data),
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

const updateTask = (index, array, item, currentExecutionAddress) => {
  const newArray = array.slice();
  newArray[index] = taskToCell(item, currentExecutionAddress);
  return newArray;
}

const accessTypeToUi = (accessType) => {
  switch(accessType) {
    case 0:
     return {
       name: '¤',
       css: 'read'
     }
    case 1:
     return {
       name: '×',
       css: 'write'
     }
    default:
     return {
       name: '&#9785;'
     }
  }
}

const coreAccessToCell = (coreAccess) => {
  const ui = accessTypeToUi(coreAccess.accessType);
  return {
    address: coreAccess.address,
    label: ui.name,
    colour: ui.css
  };
};

const taskToCell = (task, currentExecutionAddress) => {
  return {
    address: task.address,
    label: '.',
    colour: getColour(task.warriorNumber, task.address, currentExecutionAddress),
    warriorNumber: task.warriorNumber
  }
};

const defaultCell = {
	  address: 0,
	  label: '.',
	  colour: 'default'
};

const stateToTasks = (state) => {
  return state.warriors.map((w, i) =>
      w.tasks.map(t => {
        return {
          address: t.instructionPointer,
          warriorNumber: i,
          colour: ''
        }
      })).reduce((a, c) => a.concat(c));

};

const mapCoreToUi = (instructions) => {

  return instructions.map(cell => (
    {
      address: cell.address,
      color: 'default'
    }
  ));

};

// actions
export const init = (standardId, parseResults) => {

  const cs = 64;
  const coreAccess = new Array(cs);
  coreAccess.fill(defaultCell, 0, coreAccess.length)
  const taskExecution = new Array(cs);
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
    });

    const options = {
      standard: standardId,
      coresize: cs,
      minSeparation: 1,
      instructionLimit: 10,
    };

    const simulatorState = corewar.initialiseSimulator(options, parseResults, PubSub);

    dispatch({
      type: INIT,
      core: mapCoreToUi(simulatorState.core.instructions),
      coreAccess: coreAccess,
      taskExecution: taskExecution
    });

    const tasks = stateToTasks(simulatorState);

    const currentExecutionAddress = getCurrentExecutionAddress(simulatorState);

      dispatch({
        type: STEP,
        taskExecution: tasks,
        currentExecutionAddress: currentExecutionAddress
      })

  }
}

export const run = () => {

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

    corewar.simulator.run().then((result) => {
      dispatch({
        type: RUN_ENDED,
        result
      })
    });

  }
}

export const step = () => {

  const state = corewar.simulator.getState();

  const tasks = stateToTasks(state);

  const currentExecutionAddress = getCurrentExecutionAddress(state);

  corewar.simulator.step();

  return dispatch => {
    dispatch({
      type: STEP,
      taskExecution: tasks,
      currentExecutionAddress: currentExecutionAddress
    })
  }
}

const tasksToExecutionState = (tasks, state, currentExecutionAddress) => {

  let coreExecutionState = new Array(state.core.length);
  coreExecutionState.fill(defaultCell, 0, coreExecutionState.length);

  tasks.forEach(task => {
    coreExecutionState = updateTask(task.address, coreExecutionState, task, currentExecutionAddress);
  });

  return coreExecutionState;
}

const getCurrentExecutionAddress = (state) => {
  const currentWarrior = state.warriors[state.warriorIndex];
  return currentWarrior.tasks[currentWarrior.taskIndex].instructionPointer;
}

// const colourExecutionState = (state, taskExecution, currentExecutionAddress) => {
//     taskExecution.forEach((coreAddress) => {
//       coreAddress.colour = getColour(coreAddress, currentExecutionAddress);
//     });

//     return taskExecution;
//   };


const getColour = (warriorNumber, coreAddress, currentExecution) => {

  if(coreAddress === currentExecution) {
    return 'white';
  }

  switch (warriorNumber) {
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return 'default';
  }
}
