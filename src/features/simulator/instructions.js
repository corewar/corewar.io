import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Instruction from './instruction'
import RoundProgress from './roundProgress'

import { colour } from '../common/theme'

const InstructionWrapper = styled.section`
  display: grid;
  border-left: 1px solid ${colour.lightbg};
  border-right: 1px solid ${colour.lightbg};
`

const CoreVisuliser = ({ instructions, runProgress }) => (
  <InstructionWrapper>
    <RoundProgress runProgress={runProgress} />
    {instructions && instructions.map(info => (
      <Instruction
        key={info.instruction.address}
        instruction={info.instruction}
        warriorId={info.access.warriorId}/>
    ))}
  </InstructionWrapper>
)

const mapStateToProps = state => ({
  instructions: state.simulator.coreInfo,
  runProgress: state.simulator.runProgress
})

export default connect(
  mapStateToProps
)(CoreVisuliser)

export { CoreVisuliser as PureCoreVisualiser }
