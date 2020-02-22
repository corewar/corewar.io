import { expect } from 'chai'

import { put, call, select } from 'redux-saga/effects'

import { SET_WARRIORS } from '../../../features/parser/actions'

import { PAUSE } from '../../../features/simulator/actions'

import { removeWarriorSaga } from '../../../features/parser/sagas'
import { removeById } from '../../../helpers/arrayHelpers'
import { initialiseCore } from '../../../features/simulator/sagas'
import { getParserState } from '../../../features/parser/reducer'

describe('when removing warriors', () => {
  const id = 1

  const saga = removeWarriorSaga(id)

  const data = {
    warriors: [
      {
        data: { id: 1 }
      },
      {
        data: { id: 2 }
      },
      {
        data: { id: 3 }
      }
    ],
    options: {
      coreSize: 10
    }
  }

  const { warriors } = data

  const result = [1, 3]

  xit('should remove the warrior by id', () => {
    expect(saga.next().value).to.deep.equal(put({ type: PAUSE }))

    expect(saga.next(data).value).to.deep.equal(select(getParserState))

    expect(saga.next(data).value).to.deep.equal(call(removeById, id, data.warriors))

    // this isn't exported
    // expect(saga.next(data).value).to.deep.equal(
    //   call(releaseColour, id))

    // expect(saga.next(result).value).to.deep.equal(
    //   put({ type: SET_WARRIORS, result })
    // )

    // expect(saga.next().value).to.deep.equal(
    //   call(initialiseCore, data.options, result)
    // )
  })
})
