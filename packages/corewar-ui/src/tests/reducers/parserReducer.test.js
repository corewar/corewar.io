import { expect } from 'chai'

import parserReducer from './../../features/parser/reducer'
import blankWarrior from './../../helpers/blankWarrior'
import { defaultWarriors } from '../../helpers/defaultWarriors'
import { colour } from './../../features/common/theme'
import initialState from './../../features/parser/initialState'

import { SET_CURRENT_WARRIOR } from './../../features/parser/actions'

describe('when testing the parser reducer', () => {
  it('should return the initial state', () => {
    const action = {}

    const result = parserReducer(undefined, action)

    expect(result).to.deep.equal(initialState)
  })

  it('should handle the SET_CURRENT_WARRIOR action', () => {
    const action = {
      type: SET_CURRENT_WARRIOR,
      currentWarrior: {
        source: 'new warrior'
      }
    }

    const result = parserReducer([], action)

    expect(result).to.deep.equal({
      currentWarrior: action.currentWarrior,
      displayFileManager: false
    })
  })
})
