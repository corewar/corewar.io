import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  PARSE_REQUESTED
} from '../../../features/parser/actions'


import { parseWarriorSaga } from '../../../features/parser/sagas'

describe('when parsing', () => {

  const inputRedcode = 'somecode'

  const saga = parseWarriorSaga({ source: inputRedcode })

  const inputTokens = ['a', 'b', 'c']
  const parseResult = {
    tokens: inputTokens
  }

  it('calls parse with the redcode', () => {

    expect(saga.next().value).to.deep.equal(call([corewar, corewar.parse], inputRedcode))

  })

  it('then calls serialise on the tokens', () => {

    expect(saga.next(parseResult).value).to.deep.equal(call([corewar, corewar.serialise], parseResult.tokens))

  })

  it('then puts the result and redcode into the PARSE action and ends', () => {

    const inputWarrior = {}

    const expectedResult = {
      tokens: inputTokens,
      warrior: inputWarrior
    }

    expect(saga.next(inputWarrior, inputRedcode).value).to.deep.equal(put({ type: PARSE_REQUESTED, result: expectedResult, redcode: inputRedcode }))
    expect(saga.next().done).to.equal(true)

  })

})


