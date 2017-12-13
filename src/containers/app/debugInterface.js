import React from 'react'

import ParseContainer from './../parser/parseContainer'
import CoreContainer from './../simulator/coreContainer'
import SimulatorControls from './../simulator/simulatorControls'
import SimulatorStatus from './../simulator/simulatorStatus'
import CoreVisualiser from './../simulator/coreVisualiser'
import CoreInput from './../simulator/coreInput'

import './debugInterface.css'

const DebugInterface = () => (
  <div id="content">
    <div id="parser">
      <ParseContainer />
    </div>
    <div id="simulator">
      <CoreInput />
      <SimulatorControls />
      <SimulatorStatus />
      <CoreVisualiser />
      <CoreContainer />
    </div>
  </div>
)

export default DebugInterface