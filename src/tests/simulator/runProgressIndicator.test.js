
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import RunProgressIndicator from './../../components/simulator/runProgressIndicator'

it('renders without crashing', () => {
  shallow(<RunProgressIndicator />)
})
