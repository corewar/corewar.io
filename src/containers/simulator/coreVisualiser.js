import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CoreLocation from './coreLocation'

import './coreVisualiser.css'

import {
  getAt
} from '../../modules/simulator'

const CoreVisuliser = ({ instructions }) => (

  <section id="coreVisualiser">
    {instructions && instructions.map(instruction => (
      <CoreLocation key={instruction.address} instruction={instruction}/>
    ))}
  </section>
)

const mapStateToProps = state => ({
  instructions: state.simulator.instructions
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreVisuliser)

export { CoreVisuliser as PureCoreVisuliser }
