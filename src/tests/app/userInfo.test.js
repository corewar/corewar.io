
import React from 'react'
import { shallow } from 'enzyme'
import UserInfo from './../../components/app/userInfo'

it('renders without crashing', () => {
  shallow(<UserInfo />)
});