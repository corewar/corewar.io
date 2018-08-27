
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Logo from './../../features/topbar/logo'

it('renders without crashing', () => {
  shallow(<Logo />)
});

it('renders the logo text', () => {

  const text = "nameOfSite"
  const domain = ".com"

  const wrapper = shallow(<Logo siteName={text} siteDomain={domain} />)

  expect(wrapper.text()).to.equal(text)
});