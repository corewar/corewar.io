
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureSimulatorStatus } from './../../containers/simulator/simulatorStatus'

it('renders without crashing', () => {
  shallow(<PureSimulatorStatus />)
});

it('adds the fade class when running', () => {

  const props = {
    isRunning: true,
    roundResult: {}
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus span').props().className).to.equal(`fade`)
});

it('shows "running simulation" when running', () => {

  const props = {
    isRunning: true,
    roundResult: {}
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus span').text()).to.equal(`running simulation`)
});


it('shows the default text if not running', () => {

  const props = {
    isRunning: false,
    roundResult: {}
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus span').text()).to.equal(`core`)
});

it('shows the outcome text is there is an outcome', () => {

  const props = {
    isRunning: false,
    roundResult: {
      outcome: 'win'
    }
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus span').text()).to.equal(`simulation complete - ${props.roundResult.outcome}`)
});

it('shows the winnerId if there is one', () => {

  const props = {
    isRunning: false,
    roundResult: {
      outcome: 'win',
      winnerId: 3
    }
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus span').text()).contains(`- winner id: ${props.roundResult.winnerId}`)
});

