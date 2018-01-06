
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureParseControls } from './../../containers/parser/parseControls'
import ControlButton from './../../components/parser/controlButton'

describe('when testing the parse controls', () => {

  it('renders without crashing', () => {
    shallow(<PureParseControls />)
  })

  it('renders a control button', () => {

    const wrapper = shallow(<PureParseControls />)

    expect(wrapper.find(ControlButton)).to.have.length(1)
  })

})

