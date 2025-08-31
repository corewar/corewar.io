import React from 'react'
import { connect } from 'react-redux'

import FontAwesomeButton from '../common/fontAwesomeButton'
import Controls from '../common/controls'
import SpeedControl from './speedControl'

import {
  init,
  step,
  run,
  pause,
  setProcessRate,
  toggleSettings
} from './actions'

const SimulatorControls = ({ isRunning, isInitialised, init, run, pause, step,
  processRate, processRates, setProcessRate }) => (
  <Controls>
    <FontAwesomeButton visible={!isRunning} enabled={isInitialised} iconName={`play`} handleClick={run} />
    <FontAwesomeButton visible={isRunning} enabled={isRunning} iconName={`pause`} handleClick={pause} />
    <FontAwesomeButton enabled={isInitialised && !isRunning} iconName={`step-forward`} handleClick={step} />
    <FontAwesomeButton enabled={isInitialised} iconName={`undo`} handleClick={init}  />
    <SpeedControl handleClick={setProcessRate} processRate={processRate} processRates={processRates} />
  </Controls>
)

SimulatorControls.displayName = 'SimulatorControls'

const mapStateToProps = state => ({
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning,
  processRate: state.simulator.processRate,
  processRates: state.simulator.processRates
})

export default connect(
  mapStateToProps,
  {
    init,
    step,
    run,
    pause,
    setProcessRate,
    toggleSettings
  }
)(SimulatorControls)

export { SimulatorControls as PureSimulatorControls }
