import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CoreContainer from './coreContainer'
import SimulatorControls from './simulatorControls'
import SimulatorStatus from './simulatorStatus'
import CoreVisualiser from './coreVisualiser'
import CoreInput from './coreInput'

import './simulatorContainer.css'

import {
  init,
  step,
  run,
  pause,
  getCoreInstructions,
  setProcessRate
} from '../../modules/simulator'

import {
  removeWarrior
} from '../../modules/parser'

const SimulatorContainer = ({
  isRunning,
  isInitialised,
  coreSize,
  instructions,
  parseResults,
  roundResult,
  init,
  step,
  run,
  pause,
  getCoreInstructions,
  removeWarrior,
  setProcessRate,
  processRate,
  processRates }) => (

  <div id="simulatorContainer">
    <CoreInput
      parseResults={parseResults}
      removeWarrior={removeWarrior} />
    <SimulatorControls
      isInitialised={isInitialised}
      isRunning={isRunning}
      parseResults={parseResults}
      init={init}
      step={step}
      run={run}
      pause={pause}
      setProcessRate={setProcessRate}
      processRate={processRate}
      processRates={processRates} />
    <SimulatorStatus
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
      roundResult={roundResult}/>
    <CoreVisualiser instructions={instructions} />
    <CoreContainer
      getCoreInstructions={getCoreInstructions}
      coreSize={coreSize}
      isRunning={isRunning}
      isInitialised={isInitialised} />
  </div>
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  instructions: state.simulator.instructions,
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning,
  roundResult: state.simulator.roundResult,
  parseResults: state.parser.parseResults,
  processRate: state.simulator.processRate,
  processRates: state.simulator.processRates
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run,
  pause,
  getCoreInstructions,
  removeWarrior,
  setProcessRate
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }