import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  initSaga,
  pauseSaga,
  getCoreOptionsFromState,
  initialiseCore
} from '../../../sagas/simulatorSagas'


describe('when testing the init saga', () => {

  const saga = initSaga()

  it('should call the pauseSaga get the options and init the core', () => {

    const data = {
      options: {},
      parseResults: []
    }

    expect(saga.next().value).to.deep.equal(call(pauseSaga))

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call(initialiseCore, data.options, data.parseResults))
  })

})



