import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import { SET_WARRIORS, SET_CURRENT_WARRIOR } from '../../../features/parser/actions'

import { PAUSE } from '../../../features/simulator/actions'

import { insertItem } from '../../../helpers/arrayHelpers'
import { addWarriorSaga } from '../../../features/parser/sagas'
import { getParserState } from '../../../features/parser/reducer'
import { guid } from '../../../helpers/guid'
import { getCoreOptionsFromState, initialiseCore } from '../../../features/simulator/sagas'

describe('when adding warriors', () => {
  xit('should add a warrior', () => {
    const saga = addWarriorSaga()

    const currentWarrior = 3

    const data = {
      warriors: [1, 2],
      options: {
        coreSize: 10
      }
    }

    const { warriors } = data

    const guidValue = '1234'

    const result = [1, 2, 3]

    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

    expect(saga.next(data.warriors).value).to.deep.equal(select(getParserState))

    expect(saga.next().value).to.deep.equal(call(guid))

    expect(saga.next({ guidValue }).value).to.deep.equal(call(takeColour, guidValue))

    expect(saga.next({ currentWarrior }).value).to.deep.equal(
      put({ type: SET_CURRENT_WARRIOR, currentWarrior })
    )

    expect(saga.next({ warriors, currentWarrior }).value).to.deep.equal(
      call(insertItem, data.warriors.length, data.warriors, currentWarrior)
    )

    expect(saga.next(result).value).to.deep.equal(put({ type: SET_WARRIORS, warriorList: '?' }))

    // maybeinit isn't exported
    // expect(saga.next(result).value).to.deep.equal(
    //   call(maybeInit, warriorList: "?" })
    // )
  })
})
