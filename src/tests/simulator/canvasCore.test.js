
import React from 'react'
import { render } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import CanvasCore from './../../components/simulator/canvasCore'

it('renders without crashing', () => {

  const props = {
    coreSize: 8000,
    getCoreInstructions: () => {},
    isRunning: false,
    isInitialised: false
  }

  render(<CanvasCore {...props} />)
})

