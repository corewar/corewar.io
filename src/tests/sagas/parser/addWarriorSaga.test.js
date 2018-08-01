
import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import {
  ADD_WARRIOR
} from '../../../features/parser/actions'

import {
  PAUSE
} from '../../../features/simulator/actions'

import { insertItem } from '../../../helpers/arrayHelpers'
import { addWarriorSaga } from '../../../features/parser/sagas'
import { getParserState } from '../../../features/parser/reducer'
import { getCoreOptionsFromState, initialiseCore } from '../../../features/simulator/sagas'

describe('when adding warriors', () => {

  it('should add a warrior', () => {

    const saga = addWarriorSaga()

    const data = {
      parseResults: [1, 2],
      options: {
        coreSize: 10
      }
    }

    const currentWarrior = 3

    const result = [1, 2, 3]

    expect(saga.next().value).to.deep.equal(
      put({ type: PAUSE }))

    expect(saga.next().value).to.deep.equal(
      call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(
      select(getParserState))

    expect(saga.next({ currentWarrior }).value).to.deep.equal(
      call(insertItem, data.parseResults.length, data.parseResults, currentWarrior))

    expect(saga.next(result).value).to.deep.equal(
      put({ type: ADD_WARRIOR, result })
    )

    expect(saga.next().value).to.deep.equal(
      call(initialiseCore, data.options, result)
    )

  })

})