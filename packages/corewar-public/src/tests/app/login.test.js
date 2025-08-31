
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Login from './../../features/topbar/login'
import UserInfo from './../../features/topbar/userInfo'
import HeaderLink from '../../features/topbar/headerLink'

it('renders without crashing', () => {
  shallow(<Login />)
})

it('renders a sign up button if unauthenticated', () => {

  const wrapper = shallow(<Login isAuthenticated={false}/>)

  expect(wrapper.find(HeaderLink)).to.have.length(1)
  expect(wrapper.find(HeaderLink).at(0).children().text()).to.contain('sign up')
})

it('renders the user info component if authenticated', () => {

    const wrapper = shallow(<Login isAuthenticated={true}/>)

    expect(wrapper.find(UserInfo)).to.have.length(1)
})