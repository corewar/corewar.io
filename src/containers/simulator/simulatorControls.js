import React from 'react'
import FontAwesome from 'react-fontawesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'

import './simulatorControls.css'

import {
  init,
  step,
  run,
  pause
} from '../../modules/simulator'


const SimulatorControls = ({ isRunning, isInitialised, init, step, run, pause }) => (
  <section id="simulatorControlContainer">
    <div id="simulatorControls" className={isInitialised ? `active` : `inactive`}>
      <div className="simulatorControl">
        <FontAwesome name="backward" size="2x"/>
      </div>
      <PlayPauseControl isRunning={isRunning} handlePlay={run} handlePause={pause} />
      <div className="simulatorControl">
        <FontAwesome name="forward" size="2x"/>
      </div>
      <div className="simulatorControl">
        <FontAwesome name="step-forward" size="2x"/>
      </div>
      <div className="simulatorControl">
        <FontAwesome name="flag-checkered" size="2x"/>
      </div>
      <ResetControl isInitialised={isInitialised} handleReset={init} />
    </div>
  </section>
)

const mapStateToProps = state => ({
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run,
  pause
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulatorControls)

export { SimulatorControls as PureSimulatorControls }