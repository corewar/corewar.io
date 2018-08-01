
import React from 'react'
import { shallow } from 'enzyme'
import UserInfo from './../../features/topbar/userInfo'

it('renders without crashing', () => {
  shallow(<UserInfo />)
});