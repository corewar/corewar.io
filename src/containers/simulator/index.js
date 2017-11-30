import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './simulator.css';
import {
  init,
  step,
  run
} from '../../modules/simulator'
import Core from './core';

const Simulator = props => {
  //console.log(props);
  return <div>
    <h1>Core simulator</h1>
    {props.isRunning && <h2>{`${props.runProgress}%`}</h2>}
    {props.redcode && <button onClick={() => props.init(props.standardId, props.parseResults)}>Initialise Simulator</button>}
    {props.isInitialised && <button onClick={() => props.step()}>Step</button>}
    {props.isInitialised && props.isRunning === false && <button onClick={() => props.run()}>Run</button>}
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
  isInitialised: state.simulator.isInitialised,
  isRunning: state.simulator.isRunning,
  runProgress: state.simulator.runProgress
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)

export { Simulator as PureSimulator }