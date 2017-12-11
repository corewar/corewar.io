
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import WarriorList from './../../containers/parser/warriorList'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<WarriorList />)
});

it('renders no list items if there are no parseResults', () => {

  const props = {
    parseResults: []
  }

  const wrapper = shallow(<WarriorList {...props}/>)

  expect(wrapper.find('li')).to.have.length(0)
});

it('renders as many list items are there are parseResults', () => {

  const props = {
    parseResults: [
      { metaData: { name: 'warrior 1' }},
      { metaData: { name: 'warrior 2' }},
    ]
  }

  const wrapper = shallow(<WarriorList {...props}/>)

  expect(wrapper.find('li')).to.have.length(2)
});


it('calls the removeWarrior handler with the correct warrior id', () => {

  const removeWarrior = sinon.spy();

  const props = {
    parseResults: [
      { metaData: { name: 'warrior 1' }},
      { metaData: { name: 'warrior 2' }},
    ],
    removeWarrior: removeWarrior
  }

  const wrapper = shallow(<WarriorList {...props}/>)

  wrapper.find(FontAwesome).first().simulate('click')

  expect(removeWarrior.calledOnce)
  expect(removeWarrior.calledWith(0))
});

