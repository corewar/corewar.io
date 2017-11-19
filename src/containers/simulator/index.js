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
    <button onClick={() => props.init(props.standardId, props.parseResult)}>Initialise Simulator</button>
    <button onClick={() => props.step()}>Step</button>
    <div>
      <textarea value={props.redcode} readOnly="readOnly" />
      <Core core={props.core} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  parseResult: state.parser.parseResult,
  standardId: state.parser.standardId,
  core: state.simulator.core
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)