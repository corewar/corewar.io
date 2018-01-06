
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import FinishRoundControl from './../../components/simulator/finishRoundControl'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<FinishRoundControl />)
})

it('calls the clickHandler when the button is clicked', () => {

  const clickHandler = sinon.spy()

  const props = {
    isRunning: false,
    handleClick: clickHandler
  }

  const wrapper = shallow(<FinishRoundControl {...props}/>)
  wrapper.find(FontAwesome).simulate('click')

  expect(clickHandler.calledOnce)
})
