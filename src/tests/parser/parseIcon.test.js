
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import ParseIcon from './../../components/parser/parseIcon'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<ParseIcon />)
});

it('renders a cross with the error class if success is false', () => {

  const props = {
    success: false
  }

  const wrapper = mount(<ParseIcon {...props}/>)

  expect(wrapper.find(FontAwesome)).to.have.length(1)
  expect(wrapper.find(FontAwesome).props().className).to.equal('error')
  expect(wrapper.find(FontAwesome).props().name).to.equal('times')
});

it('renders a tick if success is true', () => {

  const props = {
    success: true
  }

  const wrapper = mount(<ParseIcon {...props}/>)

  expect(wrapper.find(FontAwesome)).to.have.length(1)
  expect(wrapper.find(FontAwesome).props().name).to.equal('check')
});