
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ParserOutput from './../../components/parser/parserOutput'

it('renders without crashing', () => {
  shallow(<ParserOutput />)
});

it('renders a message when parsing is in progress', () => {

  const props = {
    isParsing: true
  }

  const wrapper = shallow(<ParserOutput {...props}/>)

  expect(wrapper.find('pre').text()).to.equal('parsing...')
});

it('renders a message when not parsing but parseResult not present', () => {

  const props = {
    isParsing: false
  }

  const wrapper = shallow(<ParserOutput {...props}/>)

  expect(wrapper.find('pre').text()).to.equal('awaiting redcode')
});

it('renders the warrior when not parsing and warrior is present', () => {

  const expectedOutput = 'some codes'

  const props = {
    isParsing: false,
    parseResult: {
      warrior: expectedOutput
    }
  }

  const wrapper = shallow(<ParserOutput {...props}/>)

  expect(wrapper.find('pre').text()).to.equal(expectedOutput)
});
