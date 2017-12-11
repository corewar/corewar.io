import React from 'react'

import ParseContainer from './../parser/parseContainer'
import SimulatorContainer from './../simulator/simulatorContainer'
import SimulatorControls from './../simulator/simulatorControls'
import SimulatorStatus from './../simulator/simulatorStatus'

import './debugInterface.css'

const DebugInterface = () => (
  <div id="content">
    <div id="parser">
      <ParseContainer />
    </div>
    <div id="simulator">
      <SimulatorControls />
      <SimulatorStatus />
      <SimulatorContainer />
    </div>
  </div>
)

export default DebugInterface