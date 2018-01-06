import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import parserReducer from './../../reducers/parserReducers'

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
      currentParseResult: {},
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
      currentParseResult: 'parseResult',
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