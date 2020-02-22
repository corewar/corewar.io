import { expect } from 'chai'
import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import { put, call } from 'redux-saga/effects'

import { INIT } from '../../../features/simulator/actions'

import { initialiseCore } from '../../../features/simulator/sagas'

describe('when testing the init saga', () => {
  const data = {
    options: {},
    warriors: []
  }

  const saga = initialiseCore(data.options, data.warriors)

  it('should reset and re initialise the core ', () => {
    expect(saga.next().value).to.deep.equal(call(PubSub.publishSync, 'RESET_CORE'))

    expect(saga.next().value).to.deep.equal(
      call([corewar, corewar.initialiseSimulator], data.options, data.warriors, PubSub)
    )

    expect(saga.next().value).to.deep.equal(put({ type: INIT }))
  })
})
