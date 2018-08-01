import { expect } from 'chai'

import parserReducer from './../../features/parser/reducer'

import {
  PARSE,
  ADD_WARRIOR,
  REMOVE_WARRIOR
} from './../../actions/parserActions'

describe('when testing the parser reducers', () => {

  it('should return the initial state', () => {

    const action = {}

    const result = parserReducer(undefined, action)

    expect(result).to.deep.equal({
      isParsing: false,
      currentWarrior: {},
      parseResults: [],
      standardId: 2,
      redcode: '',
      warrior: ''
    })

  })

  it('should handle the PARSE action', () => {

    const action = {
      type: PARSE,
      result: 'parseResult',
      redcode: 'redcode'
    }

    const result = parserReducer([], action)

    expect(result).to.deep.equal({
      currentWarrior: 'parseResult',
      redcode: 'redcode',
      isParsing: false
    })

  })


  it('should handle the ADD_WARRIOR action', () => {

    const action = {
      type: ADD_WARRIOR,
      result: [
        { data: 'new warrior' }
      ]
    }

    const result = parserReducer([], action)

    expect(result).to.deep.equal({
      parseResults: action.result
    })

  })

  it('should handle the REMOVE_WARRIOR action', () => {

    const action = {
      type: REMOVE_WARRIOR,
      result: [
        { data: 'new warrior' }
      ]
    }

    const result = parserReducer([], action)

    expect(result).to.deep.equal({
      parseResults: action.result
    })

  })


})