import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Instruction from './instruction'
import RoundProgress from './roundProgress'

import { colour, space, font } from '../common/theme'

const InstructionWrapper = styled.section`
  display: grid;
  border-left: 1px solid ${colour.lightbg};
  border-right: 1px solid ${colour.lightbg};
`

const DefaultText = styled.span`
  color: ${colour.white};
  text-align: center;
  padding: ${space.m};
  line-height: 1.2em;
  font-size: ${font.small};
`

const CoreVisuliser = ({ instructions, runProgress, warriors, maxTasks, focus }) => (
  <InstructionWrapper>
    <RoundProgress
      warriors={warriors}
      maxTasks={maxTasks}
      runProgress={runProgress} />
      {instructions ? instructions.map(info =>
        <Instruction
          key={info.instruction.address}
          isFocussed={focus === info.instruction.address}
          instruction={info.instruction}
          colour={info.access.warriorData && info.access.warriorData.colour.hex}/>)
          : <DefaultText>Click on a core address</DefaultText>}
  </InstructionWrapper>
)

const mapStateToProps = state => ({
  instructions: state.simulator.coreInfo,
  runProgress: state.simulator.runProgress,
  maxTasks: state.simulator.maxTasks,
  focus: state.simulator.focus,
  warriors: state.parser.warriors
})

export default connect(
  mapStateToProps
)(CoreVisuliser)

export { CoreVisuliser as PureCoreVisualiser }
