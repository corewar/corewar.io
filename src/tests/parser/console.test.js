
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Console from './../../components/parser/console'

it('renders without crashing', () => {
  shallow(<Console />)
});

it('renders no list items if there are no messages', () => {

  const parseResults = {
    messages: null
  }

  const wrapper = shallow(<Console {...parseResults}/>)

  expect(wrapper.find('li')).to.have.length(0)
});

it('renders as many list items as there are messages', () => {

  const parseResults = {
    messages: [
      { text: 'msg one', position: { line: 0, char: 1 }},
      { text: 'msg two', position: { line: 1, char: 2 }}
    ]
  }

  const wrapper = shallow(<Console {...parseResults}/>)

  expect(wrapper.find('li')).to.have.length(2)
})

it('renders the error prefix is the message type is an error', () => {

  const parseResults = {
    messages: [
      { text: 'msg', type: 0, position: { line: 0, char: 1 }}
    ]
  }

  const wrapper = shallow(<Console {...parseResults}/>)

  expect(wrapper.find('li').text()).to.contain('ERROR')
})

it('renders the warning prefix is the message type is warning', () => {

  const parseResults = {
    messages: [
      { text: 'msg', type: 1, position: { line: 0, char: 1 }}
    ]
  }

  const wrapper = shallow(<Console {...parseResults}/>)

  expect(wrapper.find('li').text()).to.contain('WARNING')
})


it('renders the info prefix is the message type is info', () => {

    const parseResults = {
      messages: [
        { text: 'msg', type: 2, position: { line: 0, char: 1 }}
      ]
    }

    const wrapper = shallow(<Console {...parseResults}/>)

    expect(wrapper.find('li').text()).to.contain('INFO')
  })