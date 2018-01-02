
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ResetControl from './../../components/simulator/resetControl'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<ResetControl />)
});

it('calls the clickHandler when the button is clicked', () => {

  const clickHandler = sinon.spy()

  const props = {
    isRunning: false,
    handleClick: clickHandler
  }

  const wrapper = shallow(<ResetControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.calledOnce)
});

it('doesnt call the clickHandler when not initialised', () => {

  const clickHandler = sinon.spy()

  const props = {
    isInitialised: false,
    clickHandler: clickHandler
  }

  const wrapper = shallow(<ResetControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.called).to.equal(false)
});
