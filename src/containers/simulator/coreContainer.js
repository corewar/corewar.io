import React from 'react'
import { connect } from 'react-redux'

import CoreInterface from '../../components/simulator/coreInterface'

import {
  init,
  getCoreInstructions
} from '../../actions/simulatorActions'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, parseResults }) => (
    <CoreInterface
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
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
    init,
    getCoreInstructions
  }
)(CoreContainer)

export { CoreContainer as PureCoreContainer }