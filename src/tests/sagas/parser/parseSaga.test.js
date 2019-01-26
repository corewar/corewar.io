import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import { PARSE_REQUESTED } from '../../../features/parser/actions'

import { PAUSE } from '../../../features/simulator/actions'

import { parseWarriorSaga } from '../../../features/parser/sagas'

describe('when parsing', () => {
  const inputRedcode = 'somecode'

  const saga = parseWarriorSaga({ source: inputRedcode })

  const inputTokens = ['a', 'b', 'c']
  const parseResult = {
    tokens: inputTokens,
    messages: []
  }

  xit('first pauses the simulator', () => {
    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))
  })

  xit('then calls parse with the redcode', () => {
    expect(saga.next().value).to.deep.equal(call([corewar, corewar.parse], inputRedcode))
  })

  xit('then calls serialise on the tokens', () => {
    expect(saga.next(parseResult).value).to.deep.equal(
      call([corewar, corewar.serialise], parseResult.tokens)
    )
  })

  xit('then gets the currentWarrior & warriors from state', () => {
    expect(saga.next().value).to.deep.equal(select(getParserState))
  })

  xit('then puts the result and redcode into the PARSE action and ends', () => {
    const inputWarrior = {}

    const expectedResult = {
      tokens: inputTokens,
      warrior: inputWarrior
    }

    expect(saga.next(inputWarrior, inputRedcode).value).to.deep.equal(
      put({ type: PARSE_REQUESTED, result: expectedResult, redcode: inputRedcode })
    )
    expect(saga.next().done).to.equal(true)
  })
})
