
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SimulatorControls from './../../components/simulator/simulatorControls'

it('renders without crashing', () => {
  shallow(<SimulatorControls />)
})
