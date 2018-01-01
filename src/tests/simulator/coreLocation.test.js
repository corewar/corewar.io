
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import CoreLocation from './../../components/simulator/coreLocation'
import { ModeType } from './../../helpers/coreEnums'

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

