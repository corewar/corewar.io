import { expect } from 'chai'

import simulatorReducer from './../../features/simulator/reducer'
import initialState from './../../features/simulator/initialState'

import {
  INIT,
  STEP,
  RUN,
  PAUSE,
  RUN_PROGRESS,
  RUN_ENDED,
  GET_CORE_INSTRUCTIONS,
  SET_CORE_FOCUS,
  SET_PROCESS_RATE,
  SET_CORE_OPTIONS
} from './../../features/simulator/actions'

describe('when testing the simulator reducers', () => {
  it('should return the initial state', () => {
    const action = {}

    const result = simulatorReducer(undefined, action)

    expect(result).to.deep.equal(initialState)
  })

  it('should handle the INIT action', () => {
    const action = {
      type: INIT
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      isInitialised: true,
      roundResult: {},
      runProgress: 0
    })
  })

  it('should handle the STEP action', () => {
    const action = {
      type: STEP
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({})
  })

  it('should handle the RUN_PROGRESS action', () => {
    const action = {
      type: RUN_PROGRESS,
      data: {
        runProgress: 50
      }
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      runProgress: 50
    })
  })

  it('should handle the RUN action', () => {
    const action = {
      type: RUN
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      isRunning: true
    })
  })

  it('should handle the PAUSE action', () => {
    const action = {
      type: PAUSE
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      isRunning: false
    })
  })

  it('should handle the RUN_ENDED action', () => {
    const action = {
      type: RUN_ENDED,
      data: {
        winnerId: 0
      }
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      isRunning: false,
      roundResult: action.data
    })
  })

  it('should handle the GET_CORE_INSTRUCTIONS action', () => {
    const action = {
      type: GET_CORE_INSTRUCTIONS,
      coreInfo: [1, 2, 3]
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      coreInfo: action.coreInfo
    })
  })

  it('should handle the SET_CORE_FOCUS action', () => {
    const action = {
      type: SET_CORE_FOCUS,
      focus: 24
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      focus: action.focus
    })
  })

  it('should handle the SET_PROCESS_RATE action', () => {
    const action = {
      type: SET_PROCESS_RATE,
      rate: 12
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      processRate: action.rate
    })
  })

  it('should handle the SET_CORE_OPTIONS action', () => {
    const action = {
      type: SET_CORE_OPTIONS,
      id: 1,
      coreSize: 2,
      maximumCycles: 3,
      minSeparation: 4,
      instructionLimit: 5,
      maxTasks: 6
    }

    const result = simulatorReducer([], action)

    expect(result).to.deep.equal({
      currentCoreOption: action.id,
      coreSize: action.coreSize,
      maximumCycles: action.maximumCycles,
      minSeparation: action.minSeparation,
      instructionLimit: action.instructionLimit,
      maxTasks: action.maxTasks
    })
  })
})
