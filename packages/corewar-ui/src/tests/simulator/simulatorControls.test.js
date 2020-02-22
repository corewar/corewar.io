
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureSimulatorControls } from './../../features/simulator/controlsContainer'

it('renders without crashing', () => {
  shallow(<PureSimulatorControls />)
})
