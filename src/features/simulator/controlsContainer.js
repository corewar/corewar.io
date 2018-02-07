import React from 'react'
import { connect } from 'react-redux'

import FontAwesomeButton from './fontAwesomeButton'
import Controls from '../../components/styledComponents/mobile/controls'
import SpeedControl from './speedControl'

import {
  init,
  step,
  run,
  pause,
  setProcessRate
} from './actions'

const SimulatorControls = ({ isRunning, isInitialised, run, pause, step, init, processRate, processRates, setProcessRate }) => (
  <Controls>
    <FontAwesomeButton visible={!isRunning} enabled={isInitialised} iconName="play" handleClick={run} />
    <FontAwesomeButton visible={isRunning} enabled={isRunning} iconName="pause" handleClick={pause} />
    <FontAwesomeButton visible={true} enabled={!isRunning} iconName="step-forward" handleClick={step} />
    <FontAwesomeButton visible={true} enabled={true} iconName="undo" handleClick={init} />
    <SpeedControl visible={true} enabled={true} handleClick={setProcessRate} processRate={processRate} processRates={processRates} />
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
    setProcessRate
  }
)(SimulatorControls)

export { SimulatorControls as PureSimulatorControls }
