import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  initSaga,
  getCoreOptionsFromState,
  initialiseCore
} from '../../../sagas/simulatorSagas'


describe('when testing the init saga', () => {

  const saga = initSaga()

  it('should call the put the PAUSE action and get the options and init the core', () => {

    const data = {
      options: {},
      parseResults: []
    }

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call(initialiseCore, data.options, data.parseResults))
  })

})



