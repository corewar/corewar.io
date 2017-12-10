import React from 'react'

import ParseContainer from './../parser/parseContainer'
import SimulatorContainer from './../simulator/simulatorContainer'
import SimulatorControls from './../simulator/simulatorControls'

import './debugInterface.css'

const DebugInterface = (props) => (
  <div id="content">
    <div id="parser">
      <ParseContainer />
    </div>
    <div id="simulator">
      <SimulatorControls />
      <SimulatorContainer />
    </div>
  </div>
)

export default DebugInterface