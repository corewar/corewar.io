import React from 'react'
import { connect } from 'react-redux'

import MobilePage from '../common/mobilePage'
import SimulatorLayout from './simulatorLayout'
import ControlsContainer from './controlsContainer'

import {
  init,
  getCoreInstructions,
  republish
} from './actions'

import {
  removeWarrior
} from '../parser/actions'

const SimulatorContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, republish, parseResults, maxTasks, removeWarrior, tablet, mobile }) => (
  <MobilePage tablet={tablet} mobile={mobile}>
    <SimulatorLayout
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
      maxTasks={maxTasks}
      republish={republish}
      init={init}
      removeWarrior={removeWarrior}
      />
    <ControlsContainer />
  </MobilePage>
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised,
  parseResults: state.parser.parseResults,
  maxTasks: state.simulator.maxTasks
})

export default connect(
  mapStateToProps,
  {
    init,
    republish,
    getCoreInstructions,
    removeWarrior
  }
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }