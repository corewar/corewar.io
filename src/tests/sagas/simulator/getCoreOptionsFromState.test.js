import { expect } from 'chai'
import { corewar } from 'corewar'
import * as PubSub from 'pubsub-js'

import { select } from 'redux-saga/effects'

import {
  getCoreOptionsFromState
} from '../../../sagas/simulatorSagas'

import { getParserState } from '../../../reducers/parserReducers'
import { getSimulatorState } from '../../../reducers/simulatorReducers'


describe('when testing the getOptionsFromState saga', () => {

  const parseState = {
    standardId: 1,
    parseResults: []
  }

  const saga = getCoreOptionsFromState()

  it('should get the options from state', () => {

    expect(saga.next().value).to.deep.equal(
      select(getParserState))

    expect(saga.next(parseState).value).to.deep.equal(
      select(getSimulatorState))

  })

})



