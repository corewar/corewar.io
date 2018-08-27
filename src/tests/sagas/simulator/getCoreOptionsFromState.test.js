import { expect } from 'chai'

import { select } from 'redux-saga/effects'

import {
  getCoreOptionsFromState
} from '../../../features/simulator/sagas'

import { getParserState } from '../../../features/parser/reducer'
import { getSimulatorState } from '../../../features/simulator/reducer'


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



