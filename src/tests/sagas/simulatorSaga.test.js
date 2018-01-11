import test from 'tape'
import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import {
  PAUSE
} from './../../actions/simulatorActions'


import { initSaga, pauseSaga, getCoreOptionsFromState, initialiseCore } from '../../sagas/simulatorSagas'
import { getSimulatorState } from './../../reducers/simulatorReducers'
import { exec } from 'child_process';

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

  it('should pause and clear the interval if running', () => {

    const saga = pauseSaga()

    expect(saga.next().value).to.deep.equal(select(getSimulatorState))

    expect(saga.next({ isRunning: true }).value).to.deep.equal(call(window.clearInterval, runner))

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

  })

  it('should not pause and clear the interval if not running', () => {

    const saga = pauseSaga()

    const selectIsRunning = saga.next().value

    expect(selectIsRunning).to.deep.equal(select(getSimulatorState))

    expect(saga.next({ isRunning: false }).done).to.equal(true)

  })

})


