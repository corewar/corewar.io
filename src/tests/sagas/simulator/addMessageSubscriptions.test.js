import { expect } from 'chai'
import * as PubSub from 'pubsub-js'

import { call } from 'redux-saga/effects'

import {
  addMessageSubscriptions,
  sendRoundProgress,
  sendRoundEnd
} from '../../../sagas/simulatorSagas'


describe('when testing the addMessageSubscriptions saga', () => {

  const saga = addMessageSubscriptions()

  it('should subscript the pubsub correctly', () => {

    expect(saga.next().value).to.deep.equal(call(PubSub.subscribe, 'ROUND_END', sendRoundEnd))

    expect(saga.next().value).to.deep.equal(call(PubSub.subscribe, 'RUN_PROGRESS', sendRoundProgress))

  })

})



