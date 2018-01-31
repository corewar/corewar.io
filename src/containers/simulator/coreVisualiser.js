import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import CoreLocation from './../../components/simulator/coreLocation'

import { space, colour } from '../../styles/theme'

const InstructionWrapper = styled.section`
  display: grid;
  margin-top: ${space.m};
  margin-bottom: ${space.m};
  border: 1px solid ${colour.grey};
`

const CoreVisuliser = ({ instructions }) => (

  <InstructionWrapper>
    {instructions && instructions.map(info => (
      <CoreLocation
        key={info.instruction.address}
        instruction={info.instruction}
        warriorId={info.access.warriorId}/>
    ))}
  </InstructionWrapper>
)

const mapStateToProps = state => ({
  instructions: state.simulator.coreInfo
})

export default connect(
  mapStateToProps
)(CoreVisuliser)

export { CoreVisuliser as PureCoreVisualiser }
