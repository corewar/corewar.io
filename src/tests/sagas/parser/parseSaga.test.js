import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  PARSE,
  PARSE_REQUESTED,
} from '../../../actions/parserActions'


import { parseSaga } from '../../../sagas/parserSagas'

describe('when parsing', () => {

  const inputRedcode = 'somecode'

  const saga = parseSaga({ redcode: inputRedcode })

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

    expect(saga.next(inputWarrior, inputRedcode).value).to.deep.equal(put({ type: PARSE, result: expectedResult, redcode: inputRedcode }))
    expect(saga.next().done).to.equal(true)

  })

})


