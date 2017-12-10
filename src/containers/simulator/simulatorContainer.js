import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CanvasCore from './canvasCore'

import './simulatorContainer.css'

import {
  init,
  step,
  run,
  pause
} from '../../modules/simulator';

const SimulatorContainer = ({ coreSize }) => (
  <section id="core">
    <CanvasCore
      width={500}
      height={500}
      coreSize={coreSize}
      />
  </section>
)

const mapStateToProps = state => ({
  coreSize: state.simulator.coreSize
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
)(SimulatorContainer)

export { SimulatorContainer as PureSimulatorContainer }
