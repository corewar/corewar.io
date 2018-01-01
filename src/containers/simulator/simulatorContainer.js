import React from 'react'
import { connect } from 'react-redux'

import CoreContainer from './../../components/simulator/coreContainer'
import SimulatorControls from './../../components/simulator/simulatorControls'
import CoreInput from './../../components/simulator/coreInput'

import SimulatorStatus from './simulatorStatus'
import CoreVisualiser from './coreVisualiser'

import './simulatorContainer.css'

import {
  init,
  step,
  run,
  pause,
  getCoreInstructions,
  setProcessRate,
  finish
} from '../../actions/simulatorActions'

import {
  removeWarrior
} from '../../actions/parserActions'

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
  finish }) => (

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
      finish={finish}
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

export default connect(
  mapStateToProps,
  {
    init,
    step,
    run,
    pause,
    getCoreInstructions,
    removeWarrior,
    setProcessRate,
    finish
  }
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }