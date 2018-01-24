
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import CompiledOutput from './../../components/styledComponents/compiledOutput'

it('renders without crashing', () => {
  shallow(<CompiledOutput />)
});

it('renders a message when not parsing but parseResult not present', () => {

  const props = {
    isParsing: false
  }

  const wrapper = shallow(<CompiledOutput {...props}/>)

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

  const wrapper = shallow(<CompiledOutput {...props}/>)

  expect(wrapper.find('pre').text()).to.equal(expectedOutput)
});
