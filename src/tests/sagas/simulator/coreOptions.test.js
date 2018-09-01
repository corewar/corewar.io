import { expect } from 'chai'

import { CoreOptions, getCoreOptions } from '../../../helpers/coreOptions'

describe('when getting core options', () => {

  it('should return the correct options for the beginner config', () => {

    const expected = {
      coreSize: 8000,
      maximumCycles: 80000,
      maxTasks: 8000,
      minSeparation: 100,
      instructionLimit: 100
    }

    expect(getCoreOptions(CoreOptions.Beginner)).to.deep.equal(expected)

  })

  it('should return the correct options for the nano config', () => {

    const expected = {
      coreSize: 80,
      maximumCycles: 800,
      maxTasks: 80,
      minSeparation: 5,
      instructionLimit: 5
    }

    expect(getCoreOptions(CoreOptions.Nano)).to.deep.equal(expected)

  })

  it('should return the correct options for the tiny config', () => {

    const expected = {
      coreSize: 800,
      maximumCycles: 8000,
      maxTasks: 800,
      minSeparation: 20,
      instructionLimit: 20
    }

    expect(getCoreOptions(CoreOptions.Tiny)).to.deep.equal(expected)

  })


  it('should return the correct options for the limited process config', () => {

    const expected = {
      coreSize: 8000,
      maximumCycles: 80000,
      maxTasks: 8,
      minSeparation: 200,
      instructionLimit: 200
    }

    expect(getCoreOptions(CoreOptions.LimitedProcess)).to.deep.equal(expected)

  })

  it('should return the correct options for the fortress config', () => {

    const expected = {
      coreSize: 8000,
      maximumCycles: 80000,
      maxTasks: 80,
      minSeparation: 4000,
      instructionLimit: 400
    }

    expect(getCoreOptions(CoreOptions.Fortress)).to.deep.equal(expected)

  })

  it('should return the correct options for the 94t config', () => {

    const expected = {
      coreSize: 8192,
      maximumCycles: 100000,
      maxTasks: 8000,
      minSeparation: 300,
      instructionLimit: 300
    }

    expect(getCoreOptions(CoreOptions.NinetyFourT)).to.deep.equal(expected)

  })

  it('should return the correct options for the tiny limited process config', () => {

    const expected = {
      coreSize: 800,
      maximumCycles: 8000,
      maxTasks: 8,
      minSeparation: 50,
      instructionLimit: 50
    }

    expect(getCoreOptions(CoreOptions.TinyLimitedProcess)).to.deep.equal(expected)

  })

  it('should return empty options for unknown core options', () => {

    const expected = {
    }

    expect(getCoreOptions('o_O')).to.deep.equal(expected)

  })


})