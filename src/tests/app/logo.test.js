
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Logo from './../../features/topbar/logo'

it('renders without crashing', () => {
  shallow(<Logo />)
})

it('renders the siteName text', () => {

  const text = "nameOfSite"

  const wrapper = shallow(<Logo siteName={text} />)

  expect(wrapper.text()).to.contain(text)
})

it('renders the domain text', () => {

  const domain = ".com"

  const wrapper = shallow(<Logo siteDomain={domain} />)

  expect(wrapper.text()).to.contain(domain)
})