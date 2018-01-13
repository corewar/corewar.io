import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import SiteHeader from './../../components/app/siteHeader'
import Login from './../../components/app/login'
import Logo from './../../components/app/logo'
import UserInfo from './../../components/app/userInfo'


it('renders without crashing', () => {
  shallow(<SiteHeader />)
});

it('contains the logo component', () => {

  const wrapper = shallow(<SiteHeader />)

  expect(wrapper.find(Logo)).to.have.length(1)
})


it('contains the login component if not authenticated', () => {

  const wrapper = shallow(<SiteHeader isAuthenticated={false}/>)

  expect(wrapper.find(Login)).to.have.length(1)
})

it('contains the user info component if authenticated', () => {

  const wrapper = shallow(<SiteHeader isAuthenticated={true} />)

  expect(wrapper.find(UserInfo)).to.have.length(1)
})