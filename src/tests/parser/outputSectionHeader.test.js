
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import OutputSectionHeader from './../../components/parser/outputSectionHeader'

it('renders without crashing', () => {
  shallow(<OutputSectionHeader />)
});

it('renders the headerText in uppercase', () => {

  const expectedText = 'HEADER'

  const props = {
    headerText: 'header'
  }

  const wrapper = shallow(<OutputSectionHeader {...props}/>)

  expect(wrapper.find('span').text()).to.equal(expectedText)
});
