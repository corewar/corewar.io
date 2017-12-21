import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CoreLocation from './coreLocation'

import './coreVisualiser.css'

const CoreVisuliser = ({ coreInfo }) => (

  <section id="coreVisualiser">
    {coreInfo && coreInfo.map(info => (
      <CoreLocation
        key={info.instruction.address}
        instruction={info.instruction}
        warriorId={info.access.warriorId}/>
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

export { CoreVisuliser as PureCoreVisualiser }
