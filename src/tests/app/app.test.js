
import React from 'react'
import { shallow } from 'enzyme'
import App from './../../containers/app/index'

it('renders without crashing', () => {
  shallow(<App />)
});