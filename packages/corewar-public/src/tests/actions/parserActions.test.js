import { expect } from 'chai'
import { parse, addWarrior, removeWarrior } from './../../features/parser/actions'
import {
    PARSE_REQUESTED,
    ADD_WARRIOR_REQUESTED,
    REMOVE_WARRIOR_REQUESTED
  } from './../../features/parser/actions'

describe('when testing the parser actions', () => {

  it('should create an action with the redcode when parsing', () => {

    const expectedRedcode = 'redcode'

    const expectedAction = {
      type: PARSE_REQUESTED,
      source: expectedRedcode
    }

    const result = parse(expectedRedcode)

    expect(result).to.deep.equal(expectedAction)

  })

  it('should create an add warrior action', () => {

    const expectedAction = {
      type: ADD_WARRIOR_REQUESTED,
    }

    const result = addWarrior()

    expect(result).to.deep.equal(expectedAction)

  })

  it('should create a remove warrior action with an index', () => {

    const expectedId = 1

    const expectedAction = {
      type: REMOVE_WARRIOR_REQUESTED,
      id: expectedId
    }

    const result = removeWarrior(expectedId)

    expect(result).to.deep.equal(expectedAction)

  })

})