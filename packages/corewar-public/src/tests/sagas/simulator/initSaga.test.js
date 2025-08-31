import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  initSaga,
  initialiseCore,
  getCoreOptionsFromState
} from '../../../features/simulator/sagas'

import { PAUSE } from '../../../features/simulator/actions'

describe('when testing the init saga', () => {
  const saga = initSaga()

  it('should call the put the PAUSE action and get the options and init the core', () => {
    const data = {
      options: {},
      warriors: []
    }

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call(initialiseCore, data.options, data.warriors))
  })
})
