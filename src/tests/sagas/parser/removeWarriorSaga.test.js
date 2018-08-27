

import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  REMOVE_WARRIOR
} from '../../../features/parser/actions'

import { removeWarriorSaga } from '../../../features/parser/sagas'
import { removeItem } from '../../../helpers/arrayHelpers'
import { getCoreOptionsFromState, initialiseCore } from '../../../features/simulator/sagas'

describe('when removing warriors', () => {

  const index = 1

  const saga = removeWarriorSaga({ index })

  const data = {
    parseResults: [1, 2, 3],
    options: {
      coreSize: 10
    }
  }

  const result = [1, 3]

  it('should remove the warrior at the index', () => {

    expect(saga.next().value).to.deep.equal(
      put({ type: PAUSE }))

    expect(saga.next().value).to.deep.equal(
      call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(
      call(removeItem, index, data.parseResults))

    expect(saga.next(result).value).to.deep.equal(
      put({ type: REMOVE_WARRIOR, result })
    )

    expect(saga.next().value).to.deep.equal(
      call(initialiseCore, data.options, result)
    )

  })

})