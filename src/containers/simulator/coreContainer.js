import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CanvasCore from './canvasCore'

import './coreContainer.css'

import {
  getCoreInstructions
} from '../../modules/simulator';

const CoreContainer = ({ coreSize, instructions, getCoreInstructions }) => (
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
  getCoreInstructions
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreContainer)

export { CoreContainer as PureCoreContainer }
