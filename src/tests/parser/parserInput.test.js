
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SourceCodeTextArea from './../../components/styledComponents/sourceCodeTextArea'

it('renders without crashing', () => {
  shallow(<SourceCodeTextArea />)
});

it('renders a textarea with the redcode as the default', () => {

  const props = {
    redcode: 'MOV 0, 1'
  }

  const wrapper = shallow(<SourceCodeTextArea {...props}/>)

  expect(wrapper.find('textarea')).to.have.length(1)
  expect(wrapper.find('textarea').props().defaultValue).to.equal(props.redcode)
});

it('calls the handleChange when the onChange event fires', () => {

  const changeHandler = sinon.spy()
  const expectedInput = 'some text'

  const props = {
    redcode: '',
    handleChange: changeHandler
  }

  const wrapper = mount(<SourceCodeTextArea {...props}/>)

  wrapper.find('textarea').simulate('change', { target: { value: expectedInput } })

  expect(changeHandler.calledOnce)
  expect(changeHandler.calledWith(expectedInput))
});