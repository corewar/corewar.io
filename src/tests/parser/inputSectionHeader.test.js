
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import InputSectionHeader from './../../containers/parser/inputSectionHeader'

it('renders without crashing', () => {
  shallow(<InputSectionHeader />)
});

it('renders the headerText in uppercase', () => {

  const expectedText = 'HEADER'

  const props = {
    headerText: 'header'
  }

  const wrapper = shallow(<InputSectionHeader {...props}/>)

  expect(wrapper.find('span').text()).to.equal(expectedText)
});
