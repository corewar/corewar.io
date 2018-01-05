import test from 'tape'
import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  PAUSE
} from './../../actions/simulatorActions'


import { initSaga } from '../../sagas/simulatorSagas'
import { exec } from 'child_process';

describe('when testing the init saga', () => {

  const saga = initSaga()
  const runner = null

  it('first clears the draw loop for the canvas', () => {

    const result = saga.next().value
    const expected = call(window.clearInterval, runner)

    expect(result).to.deep.equal(expected)
  })

  it('then calls publishSync with a "RESET_CORE" msg', () => {
    expect(saga.next().value).to.deep.equal(call(PubSub.publishSync, 'RESET_CORE'))
  })

  it('then puts a pause action', () => {
    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))
  })

})


