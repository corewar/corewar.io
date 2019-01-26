import React from 'react'
import { render } from 'enzyme'

import CanvasCore from '../../features/simulator/core'

it('renders without crashing', () => {
  const props = {
    coreSize: 8000,
    getCoreInstructions: () => {},
    isRunning: false,
    isInitialised: false,
    init: () => {},
    republish: () => {}
  }

  render(<CanvasCore {...props} />)
})
