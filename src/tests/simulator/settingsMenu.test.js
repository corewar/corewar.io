
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SettingsMenu from './../../features/settingsMenu/settingsMenu'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<SettingsMenu />)
})

it('renders the cog icon', () => {

  const props = {
    options: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = shallow(<SettingsMenu {...props}/>)

  expect(wrapper.find(FontAwesome).props().name).to.equal(`cog`)
})

it('renders one list item per processRate', () => {

  const props = {
    options: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsMenu {...props}/>)

  expect(wrapper.find('.optionDropdown ul li').length).to.equal(props.options.length)
})

it('applies the active class to the currentCoreOption', () => {

  const props = {
    currentCoreOption: 1,
    options: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsMenu {...props}/>)

  expect(wrapper.find('.optionDropdown ul li').at(0).props().className).to.equal(`active`)
})

it('fires the clickHandler when a li is clicked', () => {

  const clickHandler = sinon.spy()

  const props = {
    handleClick: clickHandler,
    options: [
      { id: 1, name: 'Beginner'},
      { id: 2, name: 'Nano' }
    ]
  }

  const wrapper = mount(<SettingsMenu {...props}/>)

  wrapper.find('li').first().simulate('click')

  expect(clickHandler.calledOnce)
})

