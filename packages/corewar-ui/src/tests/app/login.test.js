import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Login from './../../features/topbar/login'
import UserInfo from './../../features/topbar/userInfo'

it('renders without crashing', () => {
  shallow(<Login />)
})
