import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './simulator.css';
import {
  init,
  step
} from '../../modules/simulator'
import Core from './core';

const Simulator = props => {
  console.log(props);
  return <div>
    <h1>Core simulator</h1>
    {props.redcode && <button onClick={() => props.init(props.standardId, props.parseResults)}>Initialise Simulator</button>}
    {props.isInitialised && <button onClick={() => props.step()}>Step</button>}
    <div>
      <textarea value={props.redcode} readOnly="readOnly" />
      {/* <Core type='core' data={props.core} /> */}
      <Core type='coreAccess' data={props.coreAccess} />
      <Core type='tasks' data={props.taskExecution} />
    </div>
  </div>
}

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  parseResults: state.parser.parseResults,
  standardId: state.parser.standardId,
  core: state.simulator.core,
  coreAccess: state.simulator.coreAccess,
  taskExecution: state.simulator.taskExecution,
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

export { Simulator as PureSimulator }