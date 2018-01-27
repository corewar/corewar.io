import React from 'react'
import { connect } from 'react-redux'

import FontAwesomeButton from '../../components/simulator/fontAwesomeButton'
import Controls from '../../components/styledComponents/mobile/controls'

import {
  init,
  step,
  run,
  pause,
  setProcessRate
} from '../../actions/simulatorActions'

const SimulatorControls = ({ isRunning, isInitialised, run, pause, step, init }) => (
  <Controls>
    <FontAwesomeButton visible={!isRunning} enabled={isInitialised} iconName="play" handleClick={run} />
    <FontAwesomeButton visible={isRunning} enabled={isRunning} iconName="pause" handleClick={pause} />
    <FontAwesomeButton visible={true} enabled={!isRunning} iconName="step-forward" handleClick={step} />
    <FontAwesomeButton visible={true} enabled={true} iconName="undo" handleClick={init} />
  </Controls>
)

SimulatorControls.displayName = 'SimulatorControls'

const mapStateToProps = state => ({
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning
})

export default connect(
  mapStateToProps,
  {
    init,
    step,
    run,
    pause
  }
)(SimulatorControls)

export { SimulatorControls as PureSimulatorControls }
