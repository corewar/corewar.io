import { expect } from 'chai'
import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import { put, call } from 'redux-saga/effects'

import {
  INIT
} from '../../../actions/simulatorActions'

import {
  initialiseCore
} from '../../../sagas/simulatorSagas'


describe('when testing the init saga', () => {

  const data = {
    options: {},
    parseResults: []
  }

  const saga = initialiseCore(data.options, data.parseResults)

  it('should reset and re initialise the core ', () => {

    expect(saga.next().value).to.deep.equal(
      call(PubSub.publishSync, 'RESET_CORE'))

    expect(saga.next().value).to.deep.equal(
      call([corewar, corewar.initialiseSimulator], data.options, data.parseResults, PubSub))

    expect(saga.next().value).to.deep.equal(
      put({ type: INIT }))
  })

})



