import React from 'react'
import { connect } from 'react-redux'

import SimulatorLayout from './simulatorLayout'

import {
  init,
  getCoreInstructions,
  republish
} from './actions'

import {
  removeWarrior,
  loadWarrior
} from '../parser/actions'
import { loadavg } from 'os';


const SimulatorContainer = ({ coreSize, getCoreInstructions, isRunning,
  isInitialised, init, republish, files,
  maxTasks, removeWarrior, loadWarrior, tablet, mobile }) => (
  <SimulatorLayout
    tablet={tablet}
    mobile={mobile}
    coreSize={coreSize}
    getCoreInstructions={getCoreInstructions}
    isRunning={isRunning}
    isInitialised={isInitialised}
    files={files}
    maxTasks={maxTasks}
    republish={republish}
    init={init}
    files={files}
    removeWarrior={removeWarrior}
    loadWarrior={loadWarrior}
    />
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised,
  files: state.parser.files,
  maxTasks: state.simulator.maxTasks
})

export default connect(
  mapStateToProps,
  {
    init,
    republish,
    getCoreInstructions,
    removeWarrior,
    loadWarrior
  }
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }