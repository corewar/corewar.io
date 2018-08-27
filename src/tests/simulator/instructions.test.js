
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { PureInstructions } from './../../features/simulator/instructions'
import Instruction from './../../features/simulator/instruction'

it('renders without crashing', () => {
  shallow(<PureInstructions />)
});

it('renders one coreLocation per instruction', () => {

  const props = {
    instructions: [{
      instruction: { address: 0 },
      access: { warriorId: 0 }
    },
    {
      instruction: { address: 1 },
      access: { warriorId: 1 }
    }]
  }

  const wrapper = shallow(<PureInstructions {...props}/>)

  expect(wrapper.find(Instruction).length).to.equal(props.instructions.length)
});

