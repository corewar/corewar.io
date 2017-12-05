import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './simulator.css';
import {
  init,
  step,
  run,
  setCoresize,
  setMinSeparation,
  setInstructionLimit
} from '../../modules/simulator'
import Core from './core';

const Simulator = props => {
  //console.log(props);
  return <div>
    <h1>Core simulator</h1>
    {<h2>{`${props.runProgress}%`}</h2>}
    {props.redcode && <button onClick={() => props.init(props.standardId, props.parseResults, props.coreSize, props.minSeparation, props.instructionLimit)}>Initialise Simulator</button>}
    {props.isInitialised && <button onClick={() => props.step()}>Step</button>}
    {props.isInitialised && props.isRunning === false && <button onClick={() => props.run()}>Run</button>}
    <p>
      <label>Coresize</label>
      <input onChange={e => props.setCoresize(e.target.value)} defaultValue={props.coreSize}/>

      <label>Min Seperation</label>
      <input onChange={e => props.setMinSeparation(e.target.value)} defaultValue={props.minSeparation}/>

      <label>Instruction Limit</label>
      <input onChange={e => props.setInstructionLimit(e.target.value)} defaultValue={props.instructionLimit}/>
    </p>
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
  runProgress: state.simulator.runProgress,
  coreSize: state.simulator.coreSize,
  minSeparation: state.simulator.minSeparation,
  instructionLimit: state.simulator.instructionLimit
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run,
  setCoresize,
  setMinSeparation,
  setInstructionLimit
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)

export { Simulator as PureSimulator }