import { expect } from 'chai'

import { action } from './../../actions/creator'
import { parse, addWarrior, removeWarrior } from './../../actions/parserActions'
import {
    PARSE_REQUESTED,
    ADD_WARRIOR_REQUESTED,
    REMOVE_WARRIOR_REQUESTED
  } from './../../actions/parserActions'

describe('when testing the parser actions', () => {

  it('should create an action with the redcode when parsing', () => {

    const expectedRedcode = 'redcode'

    const expectedAction = {
      type: PARSE_REQUESTED,
      redcode: expectedRedcode
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
      index: expectedId
    }

    const result = removeWarrior(expectedId)

    expect(result).to.deep.equal(expectedAction)

  })

})