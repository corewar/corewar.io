import { expect } from 'chai'

import {
  init,
  step,
  pause,
  run,
  finish,
  getCoreInstructions,
  setProcessRate,
  setCoreOptions
} from './../../features/simulator/actions'
import {
  INIT_REQUESTED,
  STEP_REQUESTED,
  RUN_REQUESTED,
  PAUSE,
  FINISH_REQUESTED,
  GET_CORE_INSTRUCTIONS_REQUESTED,
  SET_PROCESS_RATE_REQUESTED,
  SET_CORE_OPTIONS_REQUESTED
} from './../../features/simulator/actions'

describe('when testing the simulator actions', () => {
  it('should create the init action', () => {
    const expectedAction = {
      type: INIT_REQUESTED
    }

    const result = init()

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the step action', () => {
    const expectedAction = {
      type: STEP_REQUESTED
    }

    const result = step()

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the run action', () => {
    const expectedAction = {
      type: RUN_REQUESTED
    }

    const result = run()

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the pause action', () => {
    const expectedAction = {
      type: PAUSE
    }

    const result = pause()

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the finish action', () => {
    const expectedAction = {
      type: FINISH_REQUESTED
    }

    const result = finish()

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the getCoreInstructions action', () => {
    const expectedAddress = 10

    const expectedAction = {
      type: GET_CORE_INSTRUCTIONS_REQUESTED,
      address: expectedAddress
    }

    const result = getCoreInstructions(expectedAddress)

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the setProcessRate action', () => {
    const expectedRate = 12

    const expectedAction = {
      type: SET_PROCESS_RATE_REQUESTED,
      rate: expectedRate
    }

    const result = setProcessRate(expectedRate)

    expect(result).to.deep.equal(expectedAction)
  })

  it('should create the setCoreOptions action', () => {
    const expectedId = 1

    const expectedAction = {
      type: SET_CORE_OPTIONS_REQUESTED,
      id: expectedId
    }

    const result = setCoreOptions(expectedId)

    expect(result).to.deep.equal(expectedAction)
  })
})
