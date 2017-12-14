import React from 'react'

import ParseContainer from './../parser/parseContainer'
import SimulatorContainer from './../simulator/simulatorContainer'


import './debugInterface.css'

const DebugInterface = () => (
  <div id="content">
    <div id="parser">
      <ParseContainer />
    </div>
    <div id="simulator">
      <SimulatorContainer />
    </div>
  </div>
)

export default DebugInterface