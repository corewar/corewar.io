
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureCoreVisualiser } from './../../containers/simulator/coreVisualiser'
import FontAwesome from 'react-fontawesome'

it('renders without crashing', () => {
  shallow(<PureCoreVisualiser />)
});

it('renders one coreLocation per instruction', () => {

  const clickHandler = sinon.spy()

  const props = {
    instructions: [
      { address: 0 },
      { address: 1 }
    ]
  }

  const wrapper = shallow(<PureCoreVisualiser {...props}/>)

  expect(clickHandler.calledOnce)
});

