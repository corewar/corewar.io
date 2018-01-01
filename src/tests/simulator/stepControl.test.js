
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import StepControl from './../../components/simulator/stepControl'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<StepControl />)
});

it('calls the clickHandler when the button is clicked', () => {

  const clickHandler = sinon.spy()

  const props = {
    isRunning: false,
    handleClick: clickHandler
  }

  const wrapper = shallow(<StepControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.calledOnce)
});

it('doesnt call the clickHandler when not initialised', () => {

  const clickHandler = sinon.spy()

  const props = {
    isInitialised: false,
    clickHandler: clickHandler
  }

  const wrapper = shallow(<StepControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.called).to.equal(false)
});

it('doesnt call the clickHandler when running', () => {

    const clickHandler = sinon.spy()

    const props = {
      isInitialised: true,
      isRunning: false,
      clickHandler: clickHandler
    }

    const wrapper = shallow(<StepControl {...props}/>)
    wrapper.find(FontAwesome).simulate('click')

    expect(clickHandler.called).to.equal(false)
  });
