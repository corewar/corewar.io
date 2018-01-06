import React from 'react'

import ParseContainer from './../../containers/parser/parseContainer'
import SimulatorContainer from './../../containers/simulator/simulatorContainer'


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