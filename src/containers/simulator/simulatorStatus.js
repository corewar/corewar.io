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

  if(parseResults.length === 0) {
    return 'waiting for warriors'
  }

  if(roundResult.outcome) {
    let outcome = `simulation complete - result(${roundResult.outcome})`;
    if(roundResult.winnerId) {
      outcome += ` - winner(${roundResult.winnerId})`
    }
    return outcome;
  }

  if(parseResults.length > 0 && !isInitialised && !isRunning) {
    return `${parseResults.length} warriors loaded, awaiting init command`
  }

  if(parseResults.length > 0 && isInitialised && !isRunning) {
    return `${parseResults.length} warriors loaded & initialised, awaiting run command`
  }

  if(isRunning) {
    return 'running simulation'
  }

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