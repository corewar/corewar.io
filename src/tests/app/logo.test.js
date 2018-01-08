
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Logo from './../../components/app/logo'

it('renders without crashing', () => {
  shallow(<Logo />)
});

it('renders the logo text', () => {

  const text = "nameOfSite"

  const wrapper = shallow(<Logo logoText={text}/>)

  expect(wrapper.text()).to.equal(text)
});