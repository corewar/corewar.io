import test from 'tape'
import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import {
  PAUSE
} from '../../../actions/simulatorActions'


import {
  initSaga,
  pauseSaga,
  getCoreOptionsFromState,
  initialiseCore,
  addMessageSubscriptions
} from '../../../sagas/simulatorSagas'

import { getSimulatorState } from '../../../reducers/simulatorReducers'

const runner = null

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

describe('when testing the pause saga', () => {

  it('should put the pause action', () => {

    const saga = pauseSaga()

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

  })

})

describe('when testing the addMessageSubscriptions saga', () => {

  const saga = addMessageSubscriptions()



})


