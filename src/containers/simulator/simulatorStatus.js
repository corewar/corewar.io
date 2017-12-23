import React from 'react'
import { connect } from 'react-redux'

import './simulatorStatus.css';

const SimulatorStatus = ({ isRunning, isInitialised, parseResults, roundResult }) => (
  <section id="simulatorStatus">
    <div className={isRunning ? `resultContainer fade` : `resultContainer`}>
      {getStatusMessage(isRunning, isInitialised, parseResults, roundResult)}
    </div>
  </section>
)

const getStatusMessage = (isRunning, isInitialised, parseResults, roundResult) => {

  if(roundResult && roundResult.outcome) {

    let winner;

    if(typeof roundResult.winnerId !== "undefined") {
      winner = parseResults[roundResult.winnerId]
    }

    return <span>simulation complete - {roundResult.outcome}
      {winner &&
        <span>
          <div className={`winner_${roundResult.winnerId}`}></div>
          {`${winner.metaData.name}, ${winner.metaData.author}`}
        </span>}
    </span>


  }

  if(isRunning) {
    return 'running simulation'
  }

  return 'core'

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