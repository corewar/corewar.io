
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SpeedControl, { MenuItem } from './../../features/simulator/speedControl'

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

  expect(wrapper.contains(`${props.processRate} x`)).to.be.true
});

it('renders one <MenuItem /> per processRate', () => {

  const props = {
    processRates: [
      1, 2, 3, 4
    ]
  }

  const wrapper = mount(<SpeedControl {...props}/>)

  expect(wrapper.find(MenuItem).length).to.equal(props.processRates.length)
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

  wrapper.find(MenuItem).first().simulate('click')

  expect(clickHandler.calledOnce)
})

it('applies the active class to the current process rate', () => {

  const props = {
    processRate: 2,
    processRates: [
      1, 2, 3, 4
    ]
  }

  const wrapper = mount(<SpeedControl {...props}/>)

  expect(wrapper.find(MenuItem).at(1).props().active).to.be.true
})

