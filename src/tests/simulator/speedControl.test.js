
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SpeedControl from './../../components/simulator/speedControl'

it('renders without crashing', () => {
  shallow(<SpeedControl />)
});


it('renders the current processRate', () => {

  const props = {
    processRate: [
      10
    ]
  }

  const wrapper = shallow(<SpeedControl {...props}/>)

  expect(wrapper.find('.optionDropdown span').text()).to.equal(`${props.processRate} x`)
});

it('renders one list item per processRate', () => {

  const props = {
    processRates: [
      1, 2, 3, 4
    ]
  }

  const wrapper = mount(<SpeedControl {...props}/>)

  expect(wrapper.find('.optionDropdown ul li').length).to.equal(props.processRates.length)
});

it('fires the clickHandler when a li is clicked', () => {

    const clickHandler = sinon.spy()

    const props = {
      handleClick: clickHandler,
      processRates: [
        1, 2, 3, 4
      ]
    }

    const wrapper = mount(<SpeedControl {...props}/>)

    wrapper.find('li').first().simulate('click')

    expect(clickHandler.calledOnce)
  });

