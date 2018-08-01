
import React from 'react'
import { shallow } from 'enzyme'
import App from './../../features/app/app'

it('renders without crashing', () => {
  shallow(<App />)
})