import { expect } from 'chai'

import simulatorReducer from './../../reducers/simulatorReducers'

import {
  INIT,
  STEP,
  RUN,
  PAUSE,
  RUN_PROGRESS,
  RUN_ENDED,
  GET_CORE_INSTRUCTIONS,
  SET_CORE_FOCUS,
  SET_PROCESS_RATE
} from './../../actions/simulatorActions'

describe('when testing the simulator reducers', () => {

  it('should return the initial state', () => {

    const action = {}

    const result = simulatorReducer(undefined, action)

    expect(result).to.deep.equal({
      isInitialised: false,
      isRunning: false,
      runProgress: 0,
      focus: null,
      roundResult: {},

      coreSize: 8000,
      cyclesBeforeTie: 80000,
      minSeparation: 100,
      instructionLimit: 100,
      maxTasks: 8000,

      instructions: [],
      processRate: 1,
      processRates: [1, 2, 5, 12, 30, 75, 200],
      currentCoreOption: 1,
      coreOptions: [
        { id: 1, name: 'Beginner'},
        { id: 2, name: 'Nano' },
        { id: 3, name: 'Tiny' },
        { id: 4, name: 'Limited Process' },
        { id: 5, name: 'Fortress' },
        { id: 6, name: '94t' },
        { id: 7, name: 'Tiny Limited Process' }
      ]
    })

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
      coreInfo: [1 ,2 ,3]
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

})