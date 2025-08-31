
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureSimulatorContainer } from './../../features/simulator/simulatorContainer'

describe('when testing the simulator container', () => {

  it('renders without crashing', () => {
    shallow(<PureSimulatorContainer />)
  })

})

