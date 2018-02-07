import React from 'react'
import styled from 'styled-components'

import { ModifierType, ModeType, OpcodeType } from './../../helpers/coreEnums'

import { colour, font, space } from '../common/theme'

const Location = styled.div`
  flex: 1;
  border-bottom: 1px solid ${colour.grey};

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  color: ${colour.white};
  font-family: ${font.code};
  padding: ${space.s};

  :last-child {
    border-bottom: none;
  }
`

const Instruction = styled.div`
  grid-column: 1 / 3;
`

const AOp = styled.span`
  text-align: right;
`

const BOp = styled.span`
  text-align: right;
`

const CoreLocation = ({ instruction, warriorId }) => (
  <Location>
    <Instruction>
      {`${serialiseOpcode(instruction)}.${serialiseModifier(instruction)}`}
    </Instruction>
    <AOp>
      {`${serialiseOperand(instruction.aOperand)}`}
    </AOp>
    <BOp>
      {`${serialiseOperand(instruction.bOperand)}`}
    </BOp>
  </Location>
)

const serialiseOpcode = (instruction) => {

  switch (instruction.opcode) {
      case OpcodeType.ADD:
          return "ADD";
      case OpcodeType.CMP:
          return "CMP";
      case OpcodeType.DAT:
          return "DAT";
      case OpcodeType.DIV:
          return "DIV";
      case OpcodeType.DJN:
          return "DJN";
      case OpcodeType.JMN:
          return "JMN";
      case OpcodeType.JMP:
          return "JMP";
      case OpcodeType.JMZ:
          return "JMZ";
      case OpcodeType.MOD:
          return "MOD";
      case OpcodeType.MOV:
          return "MOV";
      case OpcodeType.MUL:
          return "MUL";
      case OpcodeType.NOP:
          return "NOP";
      case OpcodeType.SEQ:
          return "SEQ";
      case OpcodeType.SLT:
          return "SLT";
      case OpcodeType.SNE:
          return "SNE";
      case OpcodeType.SPL:
          return "SPL";
      case OpcodeType.SUB:
          return "SUB";
  }
}

const serialiseModifier = (instruction) => {

  switch (instruction.modifier) {
    case ModifierType.A:
      return "A"
    case ModifierType.B:
      return "B"
    case ModifierType.AB:
      return "AB"
    case ModifierType.BA:
      return "BA"
    case ModifierType.F:
      return "F"
    case ModifierType.I:
      return "I"
    case ModifierType.X:
      return "X"
  }
}

const serialiseOperand = (operand) => (
  serialiseMode(operand.mode) + serialiseAddress(operand.address)
)

const serialiseMode = (mode) => {

  switch (mode) {
    case ModeType.AIndirect:
      return "*"
    case ModeType.APostIncrement:
      return "}"
    case ModeType.APreDecrement:
      return "{"
    case ModeType.BIndirect:
      return "@"
    case ModeType.BPostIncrement:
      return ">"
    case ModeType.BPreDecrement:
      return "<"
    case ModeType.Direct:
      return "$"
    case ModeType.Immediate:
      return "#"
  }

  //throw "Unknown Mode provided to InstructionSerialiser"
}

const serialiseAddress = (address) => (
  address.toString()
)

export default CoreLocation