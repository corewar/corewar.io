
import React from 'react'
import { shallow } from 'enzyme'
import DebugInterface from './../../components/app/debugInterface'

it('renders without crashing', () => {
  shallow(<DebugInterface />)
});