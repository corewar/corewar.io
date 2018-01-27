import React from 'react'
import { connect } from 'react-redux'

import CoreInterface from '../../components/simulator/coreInterface'

import {
  step,
  init,
  run,
  pause,
  getCoreInstructions
} from '../../actions/simulatorActions'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised,
  run, pause, step, init, parseResults }) => (
    <CoreInterface
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
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
  isInitialised: state.simulator.isInitialised,
  parseResults: state.parser.parseResults
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
)(CoreContainer)

export { CoreContainer as PureCoreContainer }