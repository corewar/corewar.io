
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ControlButton from './../../containers/parser/controlButton'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<ControlButton iconClass='plus' />)
});

it('calls the clickHandler when the play button is clicked and is enabled', () => {

  const clickHandler = sinon.spy()

  const props = {
    handleClick: clickHandler,
    iconClass: 'plus',
    enabled: true
  }

  const wrapper = shallow(<ControlButton {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.calledOnce)
});

it('doesnt call the clickHandler when not enabled', () => {

  const clickHandler = sinon.spy()

  const props = {
    clickHandler: clickHandler,
    iconClass: 'plus',
    enabled: false
  }

  const wrapper = shallow(<ControlButton {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.called).to.equal(false)
});