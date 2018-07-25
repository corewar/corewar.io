
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import SourceCodeTextArea from '../../features/parser/sourceCodeTextArea'

describe('SourceCodeTextArea', () => {

  it('renders without crashing', () => {
    shallow(<SourceCodeTextArea currentWarrior={{}} handleChange={() => {}} />)
  });

  it('renders placeholder text if there is no current warrior', () => {

    const expectedPlaceholder = 'enter your redcode'

    const props = {
      currentWarrior: {
        source: 'MOV 0, 1'
      },
      handleChange: () => {}
    }

    const wrapper = shallow(<SourceCodeTextArea {...props}/>)

    expect(wrapper.find('textarea').props().placeholder).to.equal(expectedPlaceholder)
  })

  it('renders a textarea with the currentWarrior.source if a warrior is present', () => {

    const props = {
      currentWarrior: {
        source: 'MOV 0, 1'
      },
      handleChange: () => {}
    }

    const wrapper = shallow(<SourceCodeTextArea {...props}/>)

    expect(wrapper.find('textarea')).to.have.length(1)
    expect(wrapper.find('textarea').props().value).to.equal(props.currentWarrior.source)
  })

  it('calls the handleChange when the onChange event fires if there is a current warrior', () => {

    const changeHandler = sinon.spy()
    const expectedInput = 'some text'
    const event = { target: { value: expectedInput } }


    const props = {
      handleChange: changeHandler,
      currentWarrior: {
        source: 'MOV 0, 1'
      }
    }

    const wrapper = shallow(<SourceCodeTextArea {...props}/>)

    wrapper.find('textarea').simulate('change', event)


    expect(changeHandler.calledOnce).to.equal(true)
    expect(changeHandler.calledWith(event)).to.equal(true)
  })

  it('does not call the handleChange function if there is no current warrior', () => {

    const changeHandler = sinon.spy()
    const expectedInput = 'some text'

    const props = {
      handleChange: changeHandler
    }

    const wrapper = mount(<SourceCodeTextArea {...props}/>)

    wrapper.find('textarea').simulate('change', { target: { value: expectedInput } })

    expect(changeHandler.notCalled).to.equal(true)

  })
})

