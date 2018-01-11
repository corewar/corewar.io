
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { List } from 'immutable'
import * as PubSub from 'pubsub-js'

import CoreInput from './../../components/simulator/coreInput'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<CoreInput />)
})

it('renders no list items if there are no parseResults', () => {

  const props = {
    parseResults: []
  }

  const wrapper = shallow(<CoreInput {...props}/>)

  expect(wrapper.find('li')).to.have.length(0)
})

it('renders as many list items are there are parseResults', () => {

  const props = {
    parseResults: [
      { metaData: { name: 'warrior 1' }},
      { metaData: { name: 'warrior 2' }},
    ]
  }

  const wrapper = shallow(<CoreInput {...props}/>)

  expect(wrapper.find('.coreItem')).to.have.length(2)
})

it('calls the removeWarrior handler with the correct warrior id', () => {

  const removeWarrior = sinon.spy();

  const props = {
    parseResults: [
      { metaData: { name: 'warrior 1' }},
      { metaData: { name: 'warrior 2' }},
    ],
    removeWarrior: removeWarrior
  }

  const wrapper = shallow(<CoreInput {...props}/>)

  wrapper.find(FontAwesome).first().simulate('click')

  expect(removeWarrior.calledOnce)
  expect(removeWarrior.calledWith(0))
})

it('resets the task state when runProgress is zero', () => {

  const wrapper = mount(<CoreInput />)

  wrapper.setState({ tasks: List([10, 20, 30]) })

  wrapper.setProps({ runProgress: 0 })

  expect(wrapper.state('tasks')).to.equal(List())

})

it('updates the task count for the given warriorId / index on the "TASK_COUNT" message', () => {

    const wrapper = mount(<CoreInput />)

    wrapper.setState({ tasks: List([10, 20, 30]) })

    PubSub.publishSync('TASK_COUNT', { payload: [{ warriorId: 1, taskCount: 100 }]})

    expect(wrapper.state('tasks')).to.deep.equal(List([10, 100, 30]))

  })

