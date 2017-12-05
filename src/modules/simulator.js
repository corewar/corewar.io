import { corewar } from "corewar";
import * as PubSub from 'pubsub-js';
import { setTimeout, clearInterval } from "timers";

export const STEP = 'simulator/STEP'
export const INIT = 'simulator/INIT'
export const INIT_REQUESTED = 'simulator/INIT_REQUESTED'
export const RUN_REQUESTED = 'simulator/RUN_REQUESTED'
export const RUN_ENDED = 'simulator/RUN_ENDED'
export const RUN_PROGRESS = 'simulator/RUN_PROGRESS'
export const CORE_ACCESS = 'simulator/CORE_ACCESS'
export const RENDER_CORE = 'simulator/RENDER_CORE'

export const SET_INSTRUCTION_LIMIT = 'simulator/SET_INSTRUCTION_LIMIT'
export const SET_CORESIZE = 'simulator/SET_CORESIZE'
export const SET_MIN_SEPARATION = 'simulator/SET_MIN_SEPARATION'

// state
const initialState = {
  core: [],
  coreAccess: [],
  taskExecution: [],
  isInitialised: false,
  currentExecutionAddress: null,
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
        runProgress: action.data.runProgress
      }

    case RUN_ENDED:
      return {
        ...state,
        isRunning: false,
        result: console.log('END', action.result)
      }

    case CORE_ACCESS:
      return {
        ...state,
        coreAccess: updateItem(action.data.address, state.coreAccess, action.data)
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

const accessTypeToUi = (coreAccess) => {

  var warriorId = coreAccess.task ? coreAccess.task.warrior.id : 0;

  switch(coreAccess.accessType) {
    case 0:
     return {
       name: '¤',
       css: 'read',
       colour: getColour(warriorId, coreAccess.address, 0)
     }
    case 1:
     return {
       name: '×',
       css: 'write',
       colour: getColour(warriorId, coreAccess.address, 0)
     }
    default:
     return {
       name: '&#9785;',
       colour: getColour(warriorId, coreAccess.address, 0)
     }
  }
}

const coreAccessToCell = (coreAccess) => {
  const ui = accessTypeToUi(coreAccess);
  return {
    address: coreAccess.address,
    label: ui.name,
    css: ui.css,
    colour: ui.colour
  };
};

const taskToCell = (task, currentExecutionAddress) => {
  return {
    address: task.address,
    label: '.',
    colour: getColour(task.warriorId, task.address, currentExecutionAddress),
    warriorId: task.warriorId
  }
};

const defaultCell = {
	  address: 0,
	  label: '.',
	  colour: 'default'
};

const stateToTasks = (state) => {

  const currentExecutionAddress = getCurrentExecutionAddress(state);

  return state.warriors.map((w) =>
      w.tasks.map(t => {
        return {
          address: t.instructionPointer,
          warriorId: w.id,
          colour: getColour(w.id, t.instructionPointer, currentExecutionAddress)
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
export const init = (standardId, parseResults, coreSize, minSeparation, instructionLimit) => {

  const options = {
    standard: standardId,
    coresize: parseInt(coreSize, 10),
    minSeparation: parseInt(minSeparation, 10),
    instructionLimit: parseInt(instructionLimit, 10),
  };

  const coreAccess = new Array(options.coreSize);
  coreAccess.fill(defaultCell, 0, coreAccess.length)
  const taskExecution = new Array(options.coreSize);
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

    console.log('init', options);

    const simulatorState = corewar.initialiseSimulator(options, parseResults, PubSub);

    dispatch({
      type: INIT,
      core: mapCoreToUi(simulatorState.core.instructions),
      coreAccess: coreAccess,
      taskExecution: taskExecution
    });

    // console.log(simulatorState);
    // const currentExecutionAddress = getCurrentExecutionAddress(simulatorState);

    // const tasks = stateToTasks(simulatorState);

    // dispatch({
    //   type: STEP,
    //   taskExecution: tasks,
    //   currentExecutionAddress: currentExecutionAddress
    // })

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

  //   // function step(timestamp) {
  //   //   if (!start) start = timestamp;
  //   //   var progress = timestamp - start;
  //   //   element.style.left = Math.min(progress / 10, 200) + 'px';
  //   //   if (progress < 2000) {
  //   //     window.requestAnimationFrame(step);
  //   //   }
  //   // }

  //   // corewar.simulator.run().then((result) => {
  //   //   dispatch({
  //   //     type: RUN_ENDED,
  //   //     result
  //   //   })
  //   // });

    var x = 0;

    var token = setInterval(function() {

      for(var i = 0; i < 100; i++) {
        step()
      }

      x = x + 100;

      if(x === 80000) {
        clearInterval(token);
        console.log('done');
      }

    }, 100)

  }

  //     //for(var i = 0; i < 5; i++) {
  //         step();
  //     //}

  // //for(var i = 0; i < 80000; i++) {

  //   window.requestAnimationFrame(run.bind(this))
  //}
}

export const step = () => {

  const state = corewar.simulator.getState();

  const tasks = stateToTasks(state);

  console.log(tasks);

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

const getColour = (warriorId, coreAddress, currentExecution) => {

  if(coreAddress === currentExecution) {
    return 'white';
  }

  switch (warriorId) {
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return 'default';
  }
}
