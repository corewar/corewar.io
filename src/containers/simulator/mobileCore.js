import React from 'react'
import { connect } from 'react-redux'

import CoreContainer from '../../components/simulator/coreContainer'

import {
  step,
  init,
  run,
  pause,
  getCoreInstructions
} from '../../actions/simulatorActions'

const MobileCore = ({ coreSize, getCoreInstructions, isRunning, isInitialised,
  run, pause, step, init }) => (
    <CoreContainer
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      run={run}
      pause={pause}
      step={step}
      init={init}
      />
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  getCoreInstructions: state.simulator.getCoreInstructions,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised
})

export default connect(
  mapStateToProps,
  {
    run,
    init,
    pause,
    step,
    getCoreInstructions
  }
)(MobileCore)

export { MobileCore as PureTabletCore }