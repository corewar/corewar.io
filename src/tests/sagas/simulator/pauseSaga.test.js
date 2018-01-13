import { expect } from 'chai'
import { put } from 'redux-saga/effects'

import {
  PAUSE
} from '../../../actions/simulatorActions'

import {
  pauseSaga
} from '../../../sagas/simulatorSagas'

describe('when testing the pause saga', () => {

  it('should put the pause action', () => {

    const saga = pauseSaga()

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

  })

})


