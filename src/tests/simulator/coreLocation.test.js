
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import CoreLocation from './../../containers/simulator/coreLocation'

const ModeType = {
  Immediate : 0,     // #
  Direct: 1,         // $
  AIndirect: 2,      // *
  BIndirect: 3,      // @
  APreDecrement: 4,  // {
  BPreDecrement: 5,  // <
  APostIncrement: 6, // }
  BPostIncrement: 7, // >
  Count: 8
}

it('renders without crashing', () => {

  const props = {
    instruction: {
      isCurrent: true,
      aOperand: { mode: ModeType.Immediate, address: 0 },
      bOperand: { mode: ModeType.Immediate, address: 0 },
    }
  }

  shallow(<CoreLocation {...props} />)
});

it('applies the current class if the prop.isCurrent is set', () => {

  const props = {
    instruction: {
      isCurrent: true,
      aOperand: { mode: ModeType.Immediate, address: 0 },
      bOperand: { mode: ModeType.Immediate, address: 0 },
    }
  }

  const wrapper = mount(<CoreLocation {...props}/>)

  expect(wrapper.find('.coreLocation').props().className).contains('current')
});

