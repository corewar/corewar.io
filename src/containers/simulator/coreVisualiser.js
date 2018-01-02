import React from 'react'
import { connect } from 'react-redux'

import CoreLocation from './../../components/simulator/coreLocation'

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

export default connect(
  mapStateToProps
)(CoreVisuliser)

export { CoreVisuliser as PureCoreVisualiser }
