import React from 'react'
import { connect } from 'react-redux'

import CoreInterface from '../../components/simulator/coreInterface'

import {
  init,
  getCoreInstructions,
  republish
} from '../../actions/simulatorActions'

import {
  removeWarrior
} from '../../actions/parserActions'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, republish, parseResults, maxTasks, removeWarrior }) => (
    <CoreInterface
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      isRunning={isRunning}
      isInitialised={isInitialised}
      parseResults={parseResults}
      maxTasks={maxTasks}
      republish={republish}
      init={init}
      removeWarrior={removeWarrior}
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
    republish,
    getCoreInstructions,
    removeWarrior
  }
)(CoreContainer)

export { CoreContainer as PureCoreContainer }