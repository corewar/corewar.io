
import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import {
  ADD_WARRIOR
} from '../../../actions/parserActions'

import { insertItem, removeItem } from '../../../helpers/arrayHelpers'
import { addWarriorSaga } from '../../../sagas/parserSagas'
import { getParserState } from '../../../reducers/parserReducers'
import { pauseSaga, getCoreOptionsFromState, initialiseCore } from '../../../sagas/simulatorSagas'

describe('when adding warriors', () => {

  it('should add a warrior', () => {

    const saga = addWarriorSaga()

    const data = {
      parseResults: [1, 2],
      options: {
        coreSize: 10
      }
    }

    const currentParseResult = 3

    const result = [1, 2, 3]

    expect(saga.next().value).to.deep.equal(
      call(pauseSaga))

    expect(saga.next().value).to.deep.equal(
      call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(
      select(getParserState))

    expect(saga.next({ currentParseResult }).value).to.deep.equal(
      call(insertItem, data.parseResults.length, data.parseResults, currentParseResult))

    expect(saga.next(result).value).to.deep.equal(
      put({ type: ADD_WARRIOR, result })
    )

    expect(saga.next().value).to.deep.equal(
      call(initialiseCore, data.options, result)
    )

  })

})