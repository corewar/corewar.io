import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CanvasCore from './canvasCore'

import './simulatorContainer.css'

import {
  init,
  step,
  run,
  pause,
  getCoreInstructions
} from '../../modules/simulator';

const SimulatorContainer = ({ coreSize, instructions, getCoreInstructions }) => (
  <section id="core">
    <CanvasCore
      width={500}
      height={500}
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      />
  </section>
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize,
  instructions: state.simulator.instructions
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step,
  run,
  pause,
  getCoreInstructions
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }
