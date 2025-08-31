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


const SimulatorContainer = ({ coreSize, getCoreInstructions, isRunning,
  isInitialised, init, republish, warriors,
  maxTasks, removeWarrior, loadWarrior, tablet, mobile }) => (
  <SimulatorLayout
    tablet={tablet}
    mobile={mobile}
    coreSize={coreSize}
    getCoreInstructions={getCoreInstructions}
    isRunning={isRunning}
    isInitialised={isInitialised}
    warriors={warriors}
    maxTasks={maxTasks}
    republish={republish}
    init={init}
    removeWarrior={removeWarrior}
    loadWarrior={loadWarrior}
    />
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised,
  warriors: state.parser.warriors,
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