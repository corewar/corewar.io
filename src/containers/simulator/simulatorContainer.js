import React from 'react'

import CoreContainer from './coreContainer'
import SimulatorControls from './simulatorControls'
import SimulatorStatus from './simulatorStatus'
import CoreVisualiser from './coreVisualiser'
import CoreInput from './coreInput'

import './simulatorContainer.css'

const SimulatorContainer = () => (
  <div id="simulatorContainer">
    <CoreInput />
    <SimulatorControls />
    <SimulatorStatus />
    <CoreVisualiser />
    <CoreContainer />
  </div>
)


export default SimulatorContainer