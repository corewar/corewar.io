
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import CoreContainer from './../../components/simulator/coreContainer'

it('renders without crashing', () => {
  shallow(<CoreContainer />)
})

