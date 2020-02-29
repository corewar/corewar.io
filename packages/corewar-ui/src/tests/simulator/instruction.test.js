import React from 'react'
import { shallow } from 'enzyme'

import Instruction from './../../features/simulator/instruction'

it('renders without crashing', () => {
  const props = {
    isFocussed: false,
    instruction: {
      aOperand: { mode: "#", address: 0 },
      bOperand: { mode: "#", address: 0 }
    }
  }

  shallow(<Instruction {...props} />)
})
