import React from 'react'
import { connect } from 'react-redux'

import CoreInterface from '../../components/simulator/coreInterface'

import {
  init,
  getCoreInstructions
} from '../../actions/simulatorActions'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, parseResults, maxTasks }) => (
    <CoreInterface
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
      maxTasks={maxTasks}
      init={init}
      />
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  isRunning: state.simulator.isRunning,
  isInitialised: state.simulator.isInitialised,
  parseResults: state.parser.parseResults,
  maxTasks: state.simulator.maxTasks
})

export default connect(
  mapStateToProps,
  {
    init,
    getCoreInstructions
  }
)(CoreContainer)

export { CoreContainer as PureCoreContainer }