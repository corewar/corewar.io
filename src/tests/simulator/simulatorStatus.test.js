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

  expect(wrapper.find('#simulatorStatus div').props().className).to.contain(`fade`)
});

it('shows "running simulation" when running', () => {

  const props = {
    isRunning: true,
    roundResult: {}
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus div').text()).to.equal(`(╯°□°）╯ < FIGHT!`)
});


it('shows the default text if not running', () => {

  const props = {
    isRunning: false,
    roundResult: {}
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus div').text()).to.equal(`core`)
});

it('shows the outcome text is there is an outcome', () => {

  const props = {
    isRunning: false,
    roundResult: {
      outcome: 'win'
    }
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  expect(wrapper.find('#simulatorStatus div').text()).to.equal(`simulation complete - ${props.roundResult.outcome}`)
});

it('shows the winning warriors name and author', () => {

  const winnerId = 0

  const props = {
    isRunning: false,
    isInitialised: true,
    parseResults: [
      {
        metaData: {
          author: 'doug',
          name: 'super warrior'
        }
      }
    ],
    roundResult: {
      outcome: 'win',
      winnerId: winnerId
    }
  }

  const wrapper = mount(<PureSimulatorStatus {...props}/>)

  const winner = props.parseResults[winnerId]

  expect(wrapper.find('#simulatorStatus').text()).contains(`${winner.metaData.author}`)
  expect(wrapper.find('#simulatorStatus').text()).contains(`${winner.metaData.name}`)
});

it('shows a dom element coloured by the winner id', () => {

    const props = {
      isRunning: false,
      isInitialised: true,
      parseResults: [
        {
          metaData: {
            author: 'doug',
            name: 'super warrior'
          }
        }
      ],
      roundResult: {
        outcome: 'win',
        winnerId: 0
      }
    }

    const wrapper = mount(<PureSimulatorStatus {...props}/>)

    expect(wrapper.find(`.winner_${props.roundResult.winnerId}`)).to.have.length(1)
  });

