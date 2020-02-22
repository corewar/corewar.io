import { expect } from 'chai'

import { insertItem, removeItem, replaceItem } from './../../helpers/arrayHelpers'

describe('when inserting items into an array', () => {

  const initialArray = [{ a: 1}, { a: 2 }, { a: 3}]

  it('increases the length by one', () => {

    const result = insertItem(3, initialArray, { a: 4 })

    expect(result.length).to.equal(4)

  })

  it('returns a new instance of the array', () => {

    const result = insertItem(3, initialArray, { a: 4 })

    expect(result).to.not.equal(initialArray)

  })

  it('insert the item at the expected index', () => {

    const newItem = { a: 4 }
    const result = insertItem(2, initialArray, newItem)

    expect(result).to.include(newItem)
    expect(result[2]).to.equal(newItem)

  })

})

describe('when removing items from an array', () => {

  const initialArray = [{ a: 1}, { a: 2 }, { a: 3}]


  it('reduces the length by one', () => {

    const result = removeItem(1, initialArray)

    expect(result.length).to.equal(2)

  })

  it('returns a new instance of the array', () => {

    const result = removeItem(1, initialArray)

    expect(result).to.not.equal(initialArray)

  })

  it('removes the item at the expected index', () => {

    const result = removeItem(1, initialArray)

    expect(result).to.not.contain.include(initialArray[1])

  })

})

describe('when replacing items in an array', () => {

    const initialArray = [{ a: 1}, { a: 2 }, { a: 3}]
    const newItem = { a: 4 }

    it('keeps the the length the same', () => {

      const result = replaceItem(2, initialArray, newItem)

      expect(result.length).to.equal(3)

    })

    it('returns a new instance of the array', () => {

      const result = replaceItem(2, initialArray, newItem)

      expect(result).to.not.equal(initialArray)

    })

    it('replaces the item at the expected index', () => {

      const result = replaceItem(2, initialArray, newItem)

      //expect(result).to.include(newItem)
      expect(result).to.not.include(initialArray[2])
      expect(result[2]).to.deep.equal(newItem)

    })

  })