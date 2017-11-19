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
    <div>
      <textarea value={props.redcode} />
      <Core core={props.core} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
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