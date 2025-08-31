
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import FontAwesomeButton from '../../features/common/fontAwesomeButton'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<FontAwesomeButton iconClass='plus' />)
});

it('calls the clickHandler when the play button is clicked and is enabled', () => {

  const clickHandler = sinon.spy()

  const props = {
    handleClick: clickHandler,
    iconClass: 'plus',
    enabled: true
  }

  const wrapper = shallow(<FontAwesomeButton {...props}/>)
  wrapper.simulate('click')

  expect(clickHandler.calledOnce)
});

it('doesnt call the clickHandler when not enabled', () => {

  const clickHandler = sinon.spy()

  const props = {
    clickHandler: clickHandler,
    iconClass: 'plus',
    enabled: false
  }

  const wrapper = shallow(<FontAwesomeButton {...props}/>)
  wrapper.simulate('click')

  expect(clickHandler.called).to.equal(false)
});