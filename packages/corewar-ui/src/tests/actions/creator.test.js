
import { expect } from 'chai'
import { action } from './../../actions/creator'

describe('when testing the action creator', () => {

  const inputType = 'SOME_TYPE'

  const payload = {
    data: [1, 2, 3]
  }

  it('returns an object with the type set', () => {

    const result = action(inputType, payload)
    expect(result.type).to.equal(inputType)

  })

  it('returns an object with the correct payload', () => {

    const result = action(inputType, payload)
    expect(result.data).to.deep.equal(payload.data)

  })

})

