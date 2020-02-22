import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  runSaga,
  getCoreOptionsFromState,
  initialiseCore
} from '../../../features/simulator/sagas'

import {
  RUN
} from '../../../features/simulator/actions'


describe('when testing the run saga', () => {

  it('should get the core options and dispatch the run action', () => {

    const saga = runSaga()

    const data = {
      options: {},
      warriors: [],
      result: {
        outcome: null
      }
    }

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(put({ type: RUN }))
  })

  it('should re initialise the core if there is already a result', () => {

    const saga = runSaga()

    const data = {
      options: {},
      warriors: [],
      result: {
        outcome: 'WIN',
        warriorId: 0
      }
    }

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call(initialiseCore, data.options, data.warriors))

    expect(saga.next().value).to.deep.equal(put({ type: RUN }))
  })

})



