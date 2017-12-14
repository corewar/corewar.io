import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './simulatorStatus.css';

const SimulatorStatus = ({ isRunning, isInitialised, parseResults, roundResult }) => (
  <section id="simulatorStatus">
    <span className={isRunning ? `fade` : ``}>{getStatusMessage(isRunning, isInitialised, parseResults, roundResult)}</span>
  </section>
)

const getStatusMessage = (isRunning, isInitialised, parseResults, roundResult) => {

  if(roundResult.outcome) {
    let outcome = `simulation complete - ${roundResult.outcome}`;
    if(roundResult.winnerId) {
      outcome += ` - winner id: ${roundResult.winnerId}`
    }
    return outcome;
  }

  if(isRunning) {
    return 'running simulation'
  }

  return 'CORE'

}

const mapStateToProps = state => ({
  isRunning: state.simulator.isRunning,
  parseResults: state.parser.parseResults,
  isInitialised: state.simulator.isInitialised,
  roundResult: state.simulator.roundResult
})

export default connect(
  mapStateToProps
)(SimulatorStatus)

export { SimulatorStatus as PureSimulatorStatus }