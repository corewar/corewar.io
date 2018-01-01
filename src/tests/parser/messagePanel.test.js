
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import MessagePanel from './../../components/parser/messagePanel'

it('renders without crashing', () => {
  shallow(<MessagePanel />)
});

it('renders no list items if there are no messages', () => {

  const parseResults = {
    messages: null
  }

  const wrapper = shallow(<MessagePanel {...parseResults}/>);

  expect(wrapper.find('li')).to.have.length(0)
});

it('renders as many list items as there are messages', () => {

  const parseResults = {
    messages: [
      { text: 'msg one', position: { line: 0, char: 1 }},
      { text: 'msg two', position: { line: 1, char: 2 }}
    ]
  }

  const wrapper = shallow(<MessagePanel {...parseResults}/>)

  expect(wrapper.find('li')).to.have.length(2)
});