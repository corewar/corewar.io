import { expect } from 'chai'
import { corewar } from 'corewar'
import { put, call } from 'redux-saga/effects'

import {
  finishSaga,
  getCoreOptionsFromState,
  initialiseCore
} from '../../../sagas/simulatorSagas'

import {
  RUN
} from '../../../actions/simulatorActions'


describe('when testing the finish saga', () => {

  it('should get the core options and dispatch call run on the simulator', () => {

    const saga = finishSaga()

    const data = {
      options: {},
      parseResults: [],
      result: {
        outcome: null
      }
    }

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call([corewar, corewar.run]))
  })

  it('should re initialise the core if there is already a result', () => {

    const saga = finishSaga()

    const data = {
      options: {},
      parseResults: [],
      result: {
        outcome: 'WIN',
        warriorId: 0
      }
    }

    expect(saga.next().value).to.deep.equal(call(getCoreOptionsFromState))

    expect(saga.next(data).value).to.deep.equal(call(initialiseCore, data.options, data.parseResults))

    expect(saga.next().value).to.deep.equal(call([corewar, corewar.run]))
  })

})



