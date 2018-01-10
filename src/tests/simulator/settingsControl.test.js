
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SettingsControl from './../../components/simulator/settingsControl'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<SettingsControl />)
})

it('renders the cog icon', () => {

  const props = {
    coreOptions: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = shallow(<SettingsControl {...props}/>)

  expect(wrapper.find(FontAwesome).props().name).to.equal(`cog`)
})

it('renders one list item per processRate', () => {

  const props = {
    coreOptions: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsControl {...props}/>)

  expect(wrapper.find('.optionDropdown ul li').length).to.equal(props.coreOptions.length)
})

it('applies the active class to the currentCoreOption', () => {

  const props = {
    currentCoreOption: 1,
    coreOptions: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsControl {...props}/>)

  expect(wrapper.find('.optionDropdown ul li')[0].props().className).to.equal(`active`)
})

it('fires the clickHandler when a li is clicked', () => {

  const clickHandler = sinon.spy()

  const props = {
    handleClick: clickHandler,
    coreOptions: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsControl {...props}/>)

  wrapper.find('li').first().simulate('click')

  expect(clickHandler.calledOnce)
})

