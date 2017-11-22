import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './simulator.css';
import {
  init,
  step
} from '../../modules/simulator'
import Core from './core';

const Simulator = props => (
  <div>
    <h1>Core simulator</h1>
    {props.redcode && <button onClick={() => props.init(props.standardId, props.parseResult)}>Initialise Simulator</button>}
    {props.isInitialised && <button onClick={() => props.step()}>Step</button>}
    <div>
      <textarea value={props.redcode} readOnly="readOnly" />
      <Core queue={props.queue} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  parseResult: state.parser.parseResult,
  standardId: state.parser.standardId,
  core: state.simulator.core,
  queue: state.simulator.queue,
  isInitialised: state.simulator.isInitialised
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)