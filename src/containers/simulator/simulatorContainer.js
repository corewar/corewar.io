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
  setProcessRate,
  finishRound
} from '../../modules/simulator'

import {
  removeWarrior
} from '../../modules/parser'

const SimulatorContainer = ({
  isRunning,
  isInitialised,
  coreSize,
  coreInfo,
  runProgress,
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
  processRates,
  finishRound }) => (

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
      finishRound={finishRound}
      setProcessRate={setProcessRate}
      processRate={processRate}
      processRates={processRates}
      runProgress={runProgress} />
    <SimulatorStatus
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
      roundResult={roundResult}/>
    <CoreVisualiser coreInfo={coreInfo} />
    <CoreContainer
      getCoreInstructions={getCoreInstructions}
      coreSize={coreSize}
      isRunning={isRunning}
      isInitialised={isInitialised} />
  </div>
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  coreInfo: state.simulator.coreInfo,
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning,
  roundResult: state.simulator.roundResult,
  parseResults: state.parser.parseResults,
  processRate: state.simulator.processRate,
  processRates: state.simulator.processRates,
  runProgress: state.simulator.runProgress
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run,
  pause,
  getCoreInstructions,
  removeWarrior,
  setProcessRate,
  finishRound
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }