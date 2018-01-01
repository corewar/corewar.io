import React from 'react'

import { ModifierType, ModeType, OpcodeType } from './../../helpers/coreEnums'

import './coreLocation.css'

const CoreLocation = ({ instruction, warriorId }) => (
  <div className={`coreLocation ${instruction.isCurrent ? `current` : ``}` }>
    <span className={warriorId != null ? `coreLocation_${warriorId}` : ``}>{serialise(instruction)}</span>
  </div>
)

const serialise = (instruction) => (
  `${serialiseOpcode(instruction)}.${serialiseModifier(instruction)}
  ${serialiseOperand(instruction.aOperand)},${serialiseOperand(instruction.bOperand)}`
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

  throw "Unknown Mode provided to InstructionSerialiser"
}

const serialiseAddress = (address) => (
  address.toString()
)

export default CoreLocation