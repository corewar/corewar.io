
// import React from 'react'
// import { shallow, mount } from 'enzyme'
// import { expect } from 'chai'
// import sinon from 'sinon'

// import { PureParseControls } from './../../features/parser/controlsContainer'
// import ControlButton from './../../components/parser/controlButton'

// describe('when testing the parse controls', () => {

//   it('renders without crashing', () => {
//     shallow(<PureParseControls />)
//   })

//   it('renders a control button', () => {

//     const wrapper = shallow(<PureParseControls />)

//     expect(wrapper.find(ControlButton)).to.have.length(1)
//   })

//   it('control button is not enabled if there is no currentWarrior', () => {

//     const wrapper = mount(<PureParseControls currentWarrior={null} />)

//     expect(!wrapper.find(ControlButton).props().enabled)
//   })

//   it('control button is not enabled if there is no warrior', () => {

//     const wrapper = mount(<PureParseControls currentWarrior={{ warrior: null }} />)

//     expect(!wrapper.find(ControlButton).props().enabled)
//   })

//   it('control button is not enabled if there is a warrior but it has errors', () => {

//     const wrapper = mount(<PureParseControls currentWarrior={{ warrior: '', messages: ['parse error'] }} />)

//     expect(!wrapper.find(ControlButton).props().enabled)
//   })

//   it('control button is enabled if there is a correctly parsed warrior', () => {

//     const wrapper = mount(<PureParseControls currentWarrior={{ warrior: '', messages: [] }} />)

//     expect(wrapper.find(ControlButton).props().enabled)
//   })

//   it('click handler is fired on click', () => {

//     const clickHandler = sinon.spy()

//     const wrapper = shallow(<PureParseControls addWarrior={clickHandler} />)

//     wrapper.find(ControlButton).simulate('click')

//     expect(clickHandler.calledOnce)
//   })

// })

