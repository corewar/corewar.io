
import React from 'react'
import { shallow } from 'enzyme'
import { PureApp } from './../../features/app/app'

it('renders without crashing', () => {
  shallow(<PureApp />)
})