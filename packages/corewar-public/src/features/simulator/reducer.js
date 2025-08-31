import {
  GET_CORE_INSTRUCTIONS,
  INIT,
  PAUSE,
  RUN,
  RUN_ENDED,
  RUN_PROGRESS,
  SET_CORE_FOCUS,
  SET_CORE_OPTIONS,
  SET_PROCESS_RATE,
  STEP,
  TOGGLE_SETTINGS
} from './actions'

// state
import initialState from './initialState'

// selectors
export const getSimulatorState = (state) => state.simulator

// reducer
const simulatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        isInitialised: true,
        roundResult: {},
        runProgress: 0
      }

    case STEP:
      return {
        ...state
      }

    case RUN:
      return {
        ...state,
        isRunning: true
      }

    case PAUSE:
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
        roundResult: action.data
      }

    case GET_CORE_INSTRUCTIONS:
      return {
        ...state,
        coreInfo: action.coreInfo
      }

    case SET_CORE_FOCUS:
      return {
        ...state,
        focus: action.focus
      }

    case SET_PROCESS_RATE:
      return {
        ...state,
        processRate: action.rate
      }

    case SET_CORE_OPTIONS:
      return {
        ...state,
        currentCoreOption: action.id,
        coreSize: action.coreSize,
        maximumCycles: action.maximumCycles,
        minSeparation: action.minSeparation,
        instructionLimit: action.instructionLimit,
        maxTasks: action.maxTasks
      }

    case TOGGLE_SETTINGS:
      return {
        ...state,
        displaySettings: !state.displaySettings
      }

    default:
      return {
        ...state
      }
  }
}

export default simulatorReducer
