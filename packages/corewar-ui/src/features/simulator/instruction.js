import React from 'react'
import styled from 'styled-components'

import { colour, font, space } from '../common/theme'

const Location = styled.div`
  flex: 1;
  border-bottom: 1px solid ${colour.lightbg};

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  ${props => (props.colour !== undefined ? `color: ${props.colour};` : `color: ${colour.white};`)}
  ${props => props.isFocussed && `border: 1px solid ${colour.white};`}
  font-family: ${font.code};
  font-size: ${font.small};
  padding: ${space.s};

  :last-child {
    border-bottom: none;
  }
`

const InstructionText = styled.div`
  grid-column: 1 / 3;
`

const AOp = styled.span`
  text-align: right;
`

const BOp = styled.span`
  text-align: right;
`

const Instruction = ({ instruction, colour, isFocussed }) => (
  <Location colour={colour} isFocussed={isFocussed}>
    <InstructionText>
      {`${serialiseOpcode(instruction)}.${serialiseModifier(instruction)}`}
    </InstructionText>
    <AOp>{`${serialiseOperand(instruction.aOperand)}`}</AOp>
    <BOp>{`${serialiseOperand(instruction.bOperand)}`}</BOp>
  </Location>
)

const serialiseOpcode = instruction => instruction.opcode

const serialiseModifier = instruction => instruction.modifier

const serialiseOperand = operand => serialiseMode(operand.mode) + serialiseAddress(operand.address)

const serialiseMode = mode => mode

const serialiseAddress = address => address.toString()

export default Instruction
