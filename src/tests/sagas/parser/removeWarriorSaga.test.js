

import { corewar } from 'corewar'
import { expect } from 'chai'

import { put, call } from 'redux-saga/effects'

import {
  SET_WARRIORS
} from '../../../features/parser/actions'

import {
  PAUSE
} from '../../../features/simulator/actions'

import { removeWarriorSaga } from '../../../features/parser/sagas'
import { removeById } from '../../../helpers/arrayHelpers'
import { initialiseCore } from '../../../features/simulator/sagas'

describe('when removing warriors', () => {

  const id = 1

  const saga = removeWarriorSaga({ id })

  const data = {
    warriors: [{
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }],
    options: {
      coreSize: 10
    }
  }

  const result = [1, 3]

  it('should remove the warrior by id', () => {

    expect(saga.next().value).to.deep.equal(
      put({ type: PAUSE }))

    expect(saga.next(data).value).to.deep.equal(
      call(removeById, id, data.warriors))

    // this isn't exported
    // expect(saga.next(data).value).to.deep.equal(
    //   call(releaseColour, id))

    expect(saga.next(result).value).to.deep.equal(
      put({ type: SET_WARRIORS, result })
    )

    expect(saga.next().value).to.deep.equal(
      call(initialiseCore, data.options, result)
    )

  })

})