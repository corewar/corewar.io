import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import CoreLocation from './instruction'

import { colour } from '../common/theme'

const InstructionWrapper = styled.section`
  display: grid;
  border-left: 1px solid ${colour.lightbg};
  border-right: 1px solid ${colour.lightbg};
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
